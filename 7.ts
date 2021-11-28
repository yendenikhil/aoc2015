const p = console.log;
const raw = await Deno.readTextFile("7.txt");
const lines = raw.trim().split("\n");

const parseInput = (lines: string[]) => {
  const sides = lines.map((line) => line.split(" -> "))
    .map((
      [left, right],
    ) => [
      left.split(" "),
      left.split(" ").filter((e) => e.search(/[a-z]+/) > -1),
      right,
    ]);
  return sides;
};

const solve1 = (eq: string[], vals: Map<string, number>): number => {
  if (eq.length === 1) {
    // value replacement that is it
    const v = vals.get(eq[0]);
    if (v) return v;
  } else if (eq.length === 2) {
    // only NOT has two field equation
    const v = vals.get(eq[1]);
    if (v) return ~v;
  } else {
    // AND OR LEFTSHIFT RIGHTSHIFT
    const t1 = eq[0];
    const t2 = eq[2];
    const o1 = t1.search(/[a-z]+/) > -1 ? vals.get(t1) : parseInt(t1);
    const o2 = t2.search(/[a-z]+/) > -1 ? vals.get(t2) : parseInt(t2);
    // p({t1, t2,o1,o2})
    if (o1 !== undefined && o2 !== undefined) {
      switch (eq[1]) {
        case "AND":
          return o1 & o2;
        case "OR":
          return o1 | o2;
        case "LSHIFT":
          return o1 << o2;
        case "RSHIFT":
          return o1 >> o2;
      }
    }
  }
  throw new Error("something is wrong: " + eq);
};

const part1 = (eqs: any[]) => {
  const vals = new Map();
  while (!vals.has("a")) {
    for (const eq of eqs) {
      if (!vals.has(eq[2]) && eq[1].length === 0) {
        vals.set(eq[2], parseInt(eq[0]));
      }
    }
    for (const eq of eqs) {
      if (!vals.has(eq[2]) && eq[1].every((e: string) => vals.has(e))) {
        vals.set(eq[2], solve1(eq[0], vals));
      }
    }
  }
  p(vals.get("a"));
};

const eq = parseInput(lines);
part1(eq);
const eq2 = eq.filter((e) => e[2] !== "b");
eq2.push([["16076"], [], "b"]);
part1(eq2);
