const p = console.log;
const raw = await Deno.readTextFile("18.txt");

const graph = raw.trim().split("\n").map((line) =>
  line.split("").map((c) => c === "#" ? true : false)
);
const len = graph.length;

const nn = (g: boolean[][], r: number, c: number): boolean[] => {
  return [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1], [0, -1], [0, 1]]
    .map(([dr, dc]) => [r + dr, c + dc])
    .map(([dr, dc]) => {
      if (dr < 0 || dr > len - 1 || dc < 0 || dc > len - 1) return false;
      else return g[dr][dc];
    });
};

const step = (g: boolean[][], fixed: boolean): boolean[][] => {
  // g.forEach(r => p(r.map(e => e ? "#" : ".").join('')))
  // p('------')
  const onRule = (arr: boolean[]): boolean => {
    const c = arr.filter((e) => e).length;
    return c === 2 || c === 3;
  };
  const offRule = (arr: boolean[]): boolean =>
    arr.filter((e) => e).length === 3;
  const gg: boolean[][] = [];
  g.forEach((r, dr) => {
    gg[dr] = [];
    r.forEach((c, dc) => {
      const n = nn(g, dr, dc);
      if (c) {
        gg[dr][dc] = onRule(n);
      } else {
        gg[dr][dc] = offRule(n);
        // if (dr === 0 && dc === 4) p(n)
      }
    });
  });
  if (fixed) {
    gg[0][0] = true;
    gg[0][len - 1] = true;
    gg[len - 1][0] = true;
    gg[len - 1][len - 1] = true;
  }
  return gg;
};

let p1 = graph.map((r) => r.slice());
let p2 = graph.map((r) => r.slice());
p2[0][0] = true;
p2[0][len - 1] = true;
p2[len - 1][0] = true;
p2[len - 1][len - 1] = true;

for (let i = 0; i < 100; i++) {
  p1 = step(p1, false);
  // p2.forEach(r => p(r.map(e => e ? "#" : ".").join('')))
  // p('-----')
  p2 = step(p2, true);
  // p2.forEach(r => p(r.map(e => e ? "#" : ".").join('')))
  // p('=====')
}
p(p1.map((r) => r.filter((e) => e).length).reduce((c, x) => c + x, 0));
p(p2.map((r) => r.filter((e) => e).length).reduce((c, x) => c + x, 0));
