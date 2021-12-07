const p = console.log;
const raw = await Deno.readTextFile("19.txt");

const lines = raw.trim().split("\n");
const eq: Map<string, string[]> = lines.slice(0, lines.length - 2).map((line) =>
  line.split(" => ")
).reduce((m, c) => {
  const val = m.get(c[0]) ?? [];
  val.push(c[1]);
  m.set(c[0], val);
  return m;
}, new Map());
const eqr: Map<string, string> = lines.slice(0, lines.length - 2).map((line) =>
  line.split(" => ")
).reduce((m, c) => {
  m.set(c[1], c[0]);
  return m;
}, new Map());

const input = lines[lines.length - 1];
// const input = "bbAlAeAlbb"
// p({input, eq, eqr})

const tr: Set<string> = new Set();

for (const re of eq.keys()) {
  let i = 0;
  while (input.length > i) {
    const pos = input.indexOf(re, i);
    if (pos < 0) break;
    // p(pos)
    const initial = input.substring(0, pos);
    // p(initial)
    // p(input.substring(pos, pos + re.length))
    const last = input.substring(pos + re.length);
    // p(last)
    const vals = eq.get(re) ?? [];
    vals.forEach((v) => tr.add(initial + v + last));
    i = pos + 1;
  }
}
p(tr.size);

let p2 = input;
let steps = 0;
while (p2 !== "e") {
  eqr.forEach((v, k) => {
    const re = RegExp(k, "g");
    const matches = p2.matchAll(re);
    for (const m of matches) {
      steps += 1;
    }
    p2 = p2.replaceAll(k, v);
  });
}
p(steps);
