const p = console.log;
const raw = await Deno.readTextFile("5.txt");
const lines = raw.trim().split("\n");

const part1 = (lines: string[]) => {
  const val1 = (str: string) => str.search(/(ab|cd|pq|xy)/) === -1;
  const val2 = (str: string) => str.search(/([a-z])\1/) > -1;
  const val3 = (str: string) => (str.match(/[aeiou]/g)?.length ?? 0) > 2;

  return lines
    .filter(val3)
    .filter(val2)
    .filter(val1)
    .length;
};

const part2 = (lines: string[]) => {
  const val1 = (s: string) => s.search(/([a-z][a-z]).*\1/) > -1;
  const val2 = (s: string) => s.search(/([a-z]).\1/) > -1;
  return lines
    .filter(val1)
    .filter(val2)
    .length;
};

p(part1(lines));
p(part2(lines));
