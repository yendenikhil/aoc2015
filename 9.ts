const p = console.log;
const raw = await Deno.readTextFile("9.txt");
const lines = raw.trim().split("\n");
type Edge = [string, string, number];
const edges: Edge[] = lines.map((line) => line.split(" to "))
  .map(([from, rest]) => [from, ...rest.split(" = ")])
  .map(([from, to, dist]) => [from, to, parseInt(dist)]);
const rev: Edge[] = edges.map(([from, to, dist]) => [to, from, dist]);
rev.forEach((e) => edges.push(e));

const cities: Set<string> = new Set();
edges.forEach((e) => cities.add(e[0]));
edges.forEach((e) => cities.add(e[1]));

interface Entry {
  name: string;
  visited: string[];
  weight: number;
}

const part1 = (edges: Edge[], starting: string, isMin = true) => {
  const queue: Entry[] = [{ name: starting, visited: [], weight: 0 }];
  const poss = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) continue;
    const visited = curr.visited.slice();
    visited.push(curr.name);
    if (visited.length === cities.size) poss.push(curr.weight);
    edges.filter((e) => e[0] === curr.name)
      .filter((e) => !visited.includes(e[1]))
      .forEach((e) =>
        queue.push({
          name: e[1],
          visited: visited.slice(),
          weight: curr.weight + e[2],
        })
      );
  }
  if (isMin) {
    return poss.reduce((a, b) => a < b ? a : b, Number.MAX_VALUE);
  } else {
    return poss.reduce((a, b) => a > b ? a : b, 0);
  }
};

const p1 = [...cities].map((c) => part1(edges, c)).reduce((
  a: number,
  b: number,
) => a < b ? a : b);
p({ p1 });
const p2 = [...cities].map((c) => part1(edges, c, false)).reduce((
  a: number,
  b: number,
) => a > b ? a : b);
p({ p2 });
