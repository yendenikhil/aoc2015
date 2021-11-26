const raw = await Deno.readTextFile("2.in");
const p = console.log;
const lines = raw.trim().split("\n");
const dims = lines.map((line) => line.split("x").map((c) => parseInt(c)));

const part1 = (dims: number[][]) => {
  const sideAreas = dims.map(([a, b, c]) => [a * b, a * c, b * c]);
  const areas = sideAreas.map(([a, b, c]) =>
    2 * a + 2 * b + 2 * c + Math.min(a, b, c)
  );
  p(areas.reduce((a, b) => a + b));
};

const part2 = (dims: number[][]) => {
  const sorter = (a: number, b: number) => a - b;
  const adder = (a: number, b: number) => a + b;
  const vols = dims.map(([a, b, c]) => a * b * c).reduce(adder);
  const sides = dims.map((d) => {
    d.sort(sorter);
    return d[0] * 2 + d[1] * 2;
  }).reduce(adder);
  p(vols + sides);
};

part1(dims);
part2(dims);
