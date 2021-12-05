const p = console.log;

const raw = await Deno.readTextFile("13.txt");
const lines = raw.trim().split("\n");

interface Relation {
  from: string;
  to: string;
  happiness: number;
}

const relations = lines.map((line) => {
  const match = line.match(/(^\w+) would (lose|gain) (\d+) .* (\w+)\./);
  if (match) {
    return {
      from: match[1],
      to: match[4],
      happiness: parseInt(match[3]) * ("gain" === match[2] ? 1 : -1),
    };
  }
  throw new Error("ERROR");
});

function perm(permutation: Array<string>) {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

const names: Set<string> = lines.map((line) => line.split(" ")[0]).reduce(
  (s: Set<string>, p: string) => s.add(p),
  new Set(),
);

const calcHappiness = (row: string[]): number => {
  let ans = 0;
  for (let i = 0; i < row.length; i++) {
    if (i === row.length - 1) {
      const r1 = relations.find((r) => r.from === row[i] && r.to === row[0]);
      const r2 = relations.find((r) => r.to === row[i] && r.from === row[0]);
      if (r1 && r2) {
        ans += r1.happiness;
        ans += r2.happiness;
      } else {
        p("ERROR");
        break;
      }
    } else {
      const r1 = relations.find((r) =>
        r.from === row[i] && r.to === row[i + 1]
      );
      const r2 = relations.find((r) =>
        r.to === row[i] && r.from === row[i + 1]
      );
      if (r1 && r2) {
        ans += r1.happiness;
        ans += r2.happiness;
      } else {
        p("ERROR");
        break;
      }
    }
  }
  return ans;
};
const p1 = perm(Array.from(names)).map(calcHappiness).reduce(
  (max, curr) => max < curr ? curr : max,
  0,
);
p(p1);

names.forEach((n) => relations.push({ from: "me", to: n, happiness: 0 }));
names.forEach((n) => relations.push({ to: "me", from: n, happiness: 0 }));
names.add("me");

const p2 = perm(Array.from(names)).map(calcHappiness).reduce(
  (max, curr) => max < curr ? curr : max,
  0,
);
p(p2);
