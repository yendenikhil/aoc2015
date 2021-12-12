const p = console.log;
const raw = await Deno.readTextFile("24.txt");
const packages = raw.trim().split("\n").map(Number);
const adder = (a: number, b: number): number => a + b;
const weight1 = packages.reduce(adder) / 3;
const weight2 = packages.reduce(adder) / 4;

const comb = (arr: number[], depth: number, current = 1): number[][] => {
  const res: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const curr: number[] = [arr[i]];
    if (current < depth) {
      const next: number[][] = comb(arr.slice(i + 1), depth, current + 1);
      const nn = next.map((e: number[]) => [...curr, ...e]);
      res.push(...nn);
    } else {
      res.push(curr);
    }
  }
  return res;
};

function* combinations<T>(
  arr: T[],
  size: number,
): Generator<T[], void, unknown> {
  if (size < 0 || arr.length < size) {
    return; // invalid parameters, no combinations possible
  }

  // generate the initial combination indices
  const combIndices: number[] = Array.from(Array(size).keys());

  while (true) {
    yield combIndices.map((x) => arr[x]);

    // find first index to update
    let indexToUpdate = size - 1;
    while (
      indexToUpdate >= 0 &&
      combIndices[indexToUpdate] >= arr.length - size + indexToUpdate
    ) {
      indexToUpdate--;
    }

    if (indexToUpdate < 0) {
      return;
    }

    // update combination indices
    for (
      let combIndex = combIndices[indexToUpdate] + 1;
      indexToUpdate < size;
      indexToUpdate++, combIndex++
    ) {
      combIndices[indexToUpdate] = combIndex;
    }
  }
}

const solve = (w: number) => {
  let validP: number[][] = [];
  for (let i = 1; i < packages.length; i++) {
    const gen = combinations(packages, i);
    validP = [];
    while (true) {
      const next = gen.next();
      if (next.done) break;
      if (next.value.reduce(adder) === w) {
        validP.push(next.value);
      }
    }
    if (validP.length > 0) {
      break;
    }
  }
  return validP;
};

const p1 = solve(weight1).map((e) => e.reduce((a, b) => a * b)).reduce((m, c) =>
  m > c ? c : m
);
p(p1);
const p2 = solve(weight2).map((e) => e.reduce((a, b) => a * b)).reduce((m, c) =>
  m > c ? c : m
);
p(p2);
