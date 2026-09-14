import "dotenv/config";
import { MongoClient } from "mongodb";

const apply = process.argv.includes("--apply");
const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is required");

// This repository stores public Course documents only. Never modify historical purchases.
const changes = new Map([
  ["clases-privadas-espanol", { price: "25", maxPeople: "2" }],
  ["curso-semiintensivo-espanol-a1", { price: "80", maxPeople: "6" }],
  ["curso-semiintensivo-espanol-a2", { price: "80", maxPeople: "6" }],
  ["curso-intensivo-espanol-b1", { price: "175", maxPeople: "6", hoursPerWeek: "15" }],
]);

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
try {
  await client.connect();
  const courses = client.db().collection("courses");
  const docs = await courses.find({ slug: { $in: [...changes.keys()] } }).toArray();
  console.log("COMMERCIAL OFFER AUDIT");
  console.log(`Mode: ${apply ? "APPLY" : "DRY-RUN"}`);
  console.table(docs.map((doc) => ({
    document: String(doc._id), type: "Course", slug: doc.slug,
    previousPrice: doc.price, newPrice: changes.get(doc.slug).price, format: doc.format,
    capacity: `${doc.maxPeople} → ${changes.get(doc.slug).maxPeople}`,
    availability: `${doc.status ?? "unset"} → unchanged`,
  })));
  const missing = [...changes.keys()].filter((slug) => !docs.some((doc) => doc.slug === slug));
  if (missing.length) throw new Error(`Missing expected course slugs: ${missing.join(", ")}`);
  if (docs.length !== changes.size) throw new Error("Ambiguous course records; refusing to apply");
  if (apply) {
    for (const doc of docs) {
      const target = changes.get(doc.slug);
      const delta = Object.fromEntries(Object.entries(target).filter(([key, value]) => doc[key] !== value));
      if (Object.keys(delta).length) {
        await courses.updateOne({ _id: doc._id, slug: doc.slug }, { $set: delta });
        console.log(`Updated ${doc.slug}: ${JSON.stringify(delta)}`);
      }
    }
  }
  console.log(`Changed documents: ${docs.filter((doc) => Object.entries(changes.get(doc.slug)).some(([key, value]) => doc[key] !== value)).length}`);
} finally {
  await client.close();
}
