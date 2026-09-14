import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../lib/courses/commercialOffer.ts", import.meta.url), "utf8");
const seed = readFileSync(new URL("./seedCourses.cts", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const es = JSON.parse(readFileSync(new URL("../messages/es/coursePage.json", import.meta.url)));
const en = JSON.parse(readFileSync(new URL("../messages/en/coursePage.json", import.meta.url)));
for (const [slug, price] of Object.entries({
  "clases-privadas-espanol": "25",
  "curso-semiintensivo-espanol-a1": "80",
  "curso-semiintensivo-espanol-a2": "80",
  "curso-intensivo-espanol-b1": "175",
})) {
  const block = seed.split(/\n\{\n  languageToLearn:/).find((part) => part.includes(`slug: "${slug}"`));
  assert.ok(block, `missing seed ${slug}`);
  assert.match(block, new RegExp(`price: "${price}"`));
  assert.ok(es.commercialTitles[slug]);
  assert.ok(en.commercialTitles[slug]);
  if (slug.includes("semiintensivo")) {
    for (const expected of ['hoursPerWeek: "2"', 'duration: "12 meses"', 'format: "Presencial en Torrox"', 'modality: "Standar"', 'imageUrl: "/assets/AulaPrincipalGruposReducidos.png"']) {
      assert.ok(block.includes(expected), `${slug} missing ${expected}`);
    }
    assert.doesNotMatch(block, /6 clases de 1\.5h|format: "Online"/);
  }
}
for (const price of [85, 160, 220, 35, 119, 224, 308, 630]) {
  assert.match(source, new RegExp(`\\b${price}\\b`));
}
assert.doesNotMatch(JSON.stringify(es.offerDesign.private), /1:3|Trío|3 personas/);
assert.doesNotMatch(JSON.stringify(en.offerDesign.private), /1:3|Trio|3 people/);
assert.equal(es.offerDesign.private.package4, "Bono mensual de 4 clases");
assert.equal(en.offerDesign.intensive.fourWeeks, "4-week package");
assert.equal(es.offerDesign.firstClassFree, "Primera clase gratis");
assert.equal(en.offerDesign.firstClassFree, "First lesson free");
assert.equal(es.offerDesign.regular.weeklyPace, "1 tema por semana");
assert.equal(en.offerDesign.regular.duration, "12 months");
console.log("Commercial offer seed, prices, and ES/EN copy validated");
