const p = console.log;
const raw = await Deno.readTextFile("6.txt");
const lines = raw.trim().split("\n");

type Instr = [string, number[], number[]];
const parseInput = (lines: string[]): Instr[] => {
  const results: Instr[] = [];
  for (const line of lines) {
    const matches = line.match(/(.*) (\d+,\d+) .* (\d+,\d+)/);
    if (matches) {
      const op = matches[1];
      const from = matches[2].split(",").map((n) => parseInt(n));
      const to = matches[3].split(",").map((n) => parseInt(n));
      results.push([op, from, to]);
    } else {
      p("EXCEPTION!!!!!");
      break;
    }
  }
  return results;
};

const part1 = (instrs: Instr[]) => {
  const grid: boolean[][] = [];
  // initial board
  for (let i = 0; i < 1000; i++) {
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
      grid[i][j] = false;
    }
  }
  // start applying instructions
  for (const instr of instrs) {
    const [op, from, to] = instr;
    for (let i = from[0]; i <= to[0]; i++) {
      for (let j = from[1]; j <= to[1]; j++) {
        if (op === "toggle") {
          grid[i][j] = !grid[i][j];
        } else if (op === "turn on") {
          grid[i][j] = true;
        } else {
          grid[i][j] = false;
        }
      }
    }
  }
  let ctr = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (grid[i][j]) ctr++;
    }
  }
  p(ctr);
};

const part2 = (instrs: Instr[]) => {
  const grid: number[][] = [];
  // initial board
  for (let i = 0; i < 1000; i++) {
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
      grid[i][j] = 0;
    }
  }
  // start applying instructions
  for (const instr of instrs) {
    const [op, from, to] = instr;
    for (let i = from[0]; i <= to[0]; i++) {
      for (let j = from[1]; j <= to[1]; j++) {
        if (op === "toggle") {
          grid[i][j] += 2;
        } else if (op === "turn on") {
          grid[i][j] += 1;
        } else {
          if (grid[i][j] > 0) {
            grid[i][j] -= 1;
          }
        }
      }
    }
  }
  let ctr = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      ctr += grid[i][j];
    }
  }
  p(ctr);
};

const instructions = parseInput(lines);
part1(instructions);
part2(instructions);
