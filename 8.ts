const p = console.log;
const raw = await Deno.readTextFile("8.txt");
const lines = raw.trim().replaceAll(" ", "").split("\n");

const part1 = (lines: string[]) => {
  let ans = 0;
  for (const line of lines) {
    const n = eval(line);
    ans += line.length - n.length;
  }
  p({ ans });
};

const part2 = (line: string[]) => {
  let ans = 0;
  for (const line of lines) {
    ans += 2;
    const n = line.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    ans += n.length - line.length;
  }
  p({ ans });
};

part1(lines);
part2(lines);
