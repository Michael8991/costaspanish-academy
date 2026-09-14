import "dotenv/config";
import { MongoClient } from "mongodb";

const targets = new Map([
  ["curso-semiintensivo-espanol-a1", {
    title: "Curso regular de español A1",
    subTitle: "Presencial en Torrox · 1 tema por semana · 2 horas semanales",
    longDesc: "Inicia tu camino en el español en el grupo regular A1 presencial de Torrox. Durante 12 meses tendrás 2 horas de clase por semana y trabajarás un tema nuevo cada semana. Aprenderás a presentarte, describir tu entorno, hablar de tu rutina y desenvolverte en situaciones cotidianas, en un grupo de máximo 6 estudiantes.",
    hoursPerWeek: "2", duration: "12 meses", format: "Presencial en Torrox", modality: "Standar",
    imageUrl: "/assets/AulaPrincipalGruposReducidos.png",
  }],
  ["curso-semiintensivo-espanol-a2", {
    title: "Curso regular de español A2",
    subTitle: "Presencial en Torrox · 1 tema por semana · 2 horas semanales",
    longDesc: "Grupo regular A2 presencial en Torrox durante 12 meses, con 2 horas de clase por semana y un tema nuevo cada semana. Ampliarás vocabulario, reforzarás la gramática del nivel y desarrollarás mayor soltura para comunicarte en situaciones cotidianas. Trabajarás comprensión oral, lectura, conversación y escritura mediante actividades prácticas en un grupo de máximo 6 estudiantes.",
    hoursPerWeek: "2", duration: "12 meses", format: "Presencial en Torrox", modality: "Standar",
    imageUrl: "/assets/AulaPrincipalGruposReducidos.png",
  }],
]);

if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
const client = new MongoClient(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
try {
  await client.connect();
  const collection = client.db().collection("courses");
  const docs = await collection.find({ slug: { $in: [...targets.keys()] } }).toArray();
  if (docs.length !== targets.size || new Set(docs.map((doc) => doc.slug)).size !== targets.size) {
    throw new Error("Expected exactly one Course for each regular A1/A2 slug; refusing to proceed");
  }
  const updates = docs.map((doc) => {
    const target = targets.get(doc.slug);
    const modules = (doc.modules ?? []).map((module) => {
      if (module.duration !== "6 clases de 1.5h") return module;
      const { duration: _removed, ...rest } = module;
      void _removed;
      return rest;
    });
    const changedModules = JSON.stringify(modules) !== JSON.stringify(doc.modules ?? []);
    const delta = Object.fromEntries(Object.entries(target).filter(([key, value]) => doc[key] !== value));
    if (changedModules) delta.modules = modules;
    return { doc, delta };
  });
  console.log(`REGULAR COURSES AUDIT — ${process.argv.includes("--apply") ? "APPLY" : "DRY-RUN"}`);
  console.table(updates.map(({ doc, delta }) => ({ id: String(doc._id), slug: doc.slug, format: `${doc.format} → ${targets.get(doc.slug).format}`, duration: `${doc.duration} → 12 meses`, hours: `${doc.hoursPerWeek} → 2`, type: `${doc.modality} → Standar`, image: `${doc.imageUrl} → ${targets.get(doc.slug).imageUrl}`, obsoleteModuleDurations: (doc.modules ?? []).filter((module) => module.duration === "6 clases de 1.5h").length, changed: Object.keys(delta).length > 0 })));
  if (process.argv.includes("--apply")) {
    for (const { doc, delta } of updates) {
      if (Object.keys(delta).length) await collection.updateOne({ _id: doc._id, slug: doc.slug }, { $set: delta });
    }
  }
  console.log(`Documents to change: ${updates.filter(({ delta }) => Object.keys(delta).length).length}`);
} finally {
  await client.close();
}
