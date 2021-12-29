const p = console.log;
const inrow = 2947;
const incol = 3029;
const t1 = inrow + incol - 2;
const pos = 1 + (t1 * (t1 + 1) / 2) + incol - 1;
p(pos);
let p1 = 20151125;
for (let i = 1; i < pos; i++) {
  p1 = (p1 * 252533) % 33554393;
}
p(p1);

/*
   | 1   2   3   4   5   6
---+---+---+---+---+---+---+
 1 |  1   3   6  10  15  21
 2 |  2   5   9  14  20
 3 |  4   8  13  19
 4 |  7  12  18
 5 | 11  17
 6 | 16
* */
