const p = console.log;
const raw = await Deno.readTextFile("16.txt");
const lines = raw.trim().split("\n");
const ticker = new Map();
"children: 3,cats: 7,samoyeds: 2,pomeranians: 3,akitas: 0,vizslas: 0,goldfish: 5,trees: 3,cars: 2,perfumes: 1"
  .split(",")
  .map((item) => item.split(": ")).forEach(([l, r]) =>
    ticker.set(l, parseInt(r))
  );

const aunts = lines.map((line) =>
  line.match(/(.*): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/)
)
  .map((v) => {
    if (v) {
      const m = new Map();
      m.set("aunt", v[1]);
      m.set(v[2], parseInt(v[3]));
      m.set(v[4], parseInt(v[5]));
      m.set(v[6], parseInt(v[7]));
      return m;
    } else return undefined;
  });

const p1 = aunts.map((a) => {
  if (!a) return;
  for (const prop of a.keys()) {
    if (prop === "aunt") continue;
    if (ticker.get(prop) !== a.get(prop)) return;
  }
  return a;
}).filter((e) => e);
p(p1[0]?.get("aunt"));

const p2 = aunts.map((a) => {
  if (!a) return;
  for (const prop of a.keys()) {
    if (prop === "aunt") continue;
    if (prop === "cats" || prop === "trees") {
      if (ticker.get(prop) >= a.get(prop)) return;
    } else if (prop === "pomeranians" || prop === "goldfish") {
      if (ticker.get(prop) <= a.get(prop)) return;
    } else if (ticker.get(prop) !== a.get(prop)) return;
  }
  return a;
}).filter((e) => e);
p(p2[0]?.get("aunt"));
