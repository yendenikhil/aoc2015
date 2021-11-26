const p = console.log;

const key = (x: number, y: number) => JSON.stringify({ x, y });
const raw = await Deno.readTextFile("3.txt");

const dir = new Map();
dir.set("<", { x: -1, y: 0 });
dir.set("^", { x: 0, y: 1 });
dir.set(">", { x: 1, y: 0 });
dir.set("v", { x: 0, y: -1 });
const part1 = (raw: string) => {
  const visited = new Set();
  visited.add(key(0, 0));
  let curr = { x: 0, y: 0 };
  raw.split("").map((c) => dir.get(c)).forEach(({ x, y }) => {
    curr.x += x;
    curr.y += y;
    visited.add(key(curr.x, curr.y));
  });
  return visited.size;
};

const part2 = (raw: string) => {
  const visited = new Set();
  visited.add(key(0, 0));
  let curr1 = { x: 0, y: 0 };
  let curr2 = { x: 0, y: 0 };
  raw.split("").map((c) => dir.get(c)).forEach(({ x, y }, i) => {
    if (i % 2 === 0) {
      curr1.x += x;
      curr1.y += y;
      visited.add(key(curr1.x, curr1.y));
    } else {
      curr2.x += x;
      curr2.y += y;
      visited.add(key(curr2.x, curr2.y));
    }
  });
  return visited.size;
};

p(`part1: ${part1(raw)}`);
p(`part2: ${part2(raw)}`);
