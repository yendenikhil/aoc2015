const p = console.log;
const raw = 36000000;
const div = [];

const presents: Map<number, number> = new Map();
for (let i = 1; i <= raw / 10; i++) {
  presents.set(i, 10);
}

for (let i = 2; i < raw / 10; i++) {
  for (let j = i; j < raw / 10; j += i) {
    const val = presents.get(j) ?? 0;
    presents.set(j, val + i * 10);
  }
}
for (const k of presents.keys()) {
  if ((presents.get(k) ?? 0) >= raw) {
    p(k);
    break;
  }
}
const p2 = [0];
for (let i = 1; i <= raw / 11; i++) {
  if (i <= 50) {
    p2.push(11);
  } else p2.push(0);
}

for (let i = 2; i < raw / 11; i++) {
  for (let j = i; j <= 50 * i && j < raw; j += i) {
    p2[j] += i * 11;
  }
}
for (let i = 2; i < p2.length; i++) {
  if (p2[i] >= raw) {
    p(i);
    break;
  }
}
