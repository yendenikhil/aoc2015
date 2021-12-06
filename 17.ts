const p = console.log;
const raw = await Deno.readTextFile("17.txt");
const lines = raw.trim().split("\n").map((e) => parseInt(e));
const adder = (sum: number, x: number) => sum + x;
const indices = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
];

const combinations = (arr: number[]): number[][] => {
  if (arr.length === 0) return [[]];

  let firstElement = arr[0];
  let restElements = arr.slice(1);

  //recursive call
  let combinationsWithoutFirstElement = combinations(restElements);
  let combinationsWithFirstElement: number[][] = [];

  combinationsWithoutFirstElement.forEach((comb) => {
    let combinationWithFirst = [...comb, firstElement];
    combinationsWithFirstElement.push(combinationWithFirst);
  });

  //combine first and rest of the combination
  return [...combinationsWithoutFirstElement, ...combinationsWithFirstElement];
};

const combo = combinations(lines).filter((r) => r.reduce(adder, 0) === 150);

p(combo.length);

const minNum = combo.reduce((m, c) => m > c.length ? c.length : m, 20);
p(combo.filter((arr) => arr.length === minNum).length);
