const p = console.log;
const raw = await Deno.readTextFile("15.txt");
const lines = raw.trim().split("\n");

const ing = lines.map((line) =>
  line.match(
    /: capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/,
  )
)
  .map((m) => {
    if (m) {
      return m.slice(1).map((e) => parseInt(e));
    } else return undefined;
  });

const score = (counts: number[]) => {
  const [a, b, c, d] = counts;
  const [aa, bb, cc, dd] = ing;
  if (aa && bb && cc && dd) {
    let cap = a * aa[0] + b * bb[0] + c * cc[0] + d * dd[0];
    let dur = a * aa[1] + b * bb[1] + c * cc[1] + d * dd[1];
    let fla = a * aa[2] + b * bb[2] + c * cc[2] + d * dd[2];
    let tex = a * aa[3] + b * bb[3] + c * cc[3] + d * dd[3];
    let cal = a * aa[4] + b * bb[4] + c * cc[4] + d * dd[4];
    if (cap < 0) cap = 0;
    if (dur < 0) dur = 0;
    if (fla < 0) fla = 0;
    if (tex < 0) tex = 0;
    return [cap * dur * fla * tex, cal];
  }
  p("ERROR");
  return [0, 0];
};

let max1 = 0;
let max2 = 0;
for (let i = 0; i <= 100; i++) {
  for (let j = 0; j <= 100; j++) {
    for (let k = 0; k <= 100; k++) {
      const l = 100 - i - j - k;
      if (l < 0) continue;
      const s = score([i, j, k, l]);
      if (s[1] === 500) {
        max2 = max2 < s[0] ? s[0] : max2;
      }
      max1 = max1 < s[0] ? s[0] : max1;
    }
  }
}

p(max1);
p(max2);
