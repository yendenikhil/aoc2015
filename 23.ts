const p = console.log;
const raw = await Deno.readTextFile("23.txt");
const lines = raw.trim().split("\n");

const instr = lines.map((line) =>
  line.match(/(...) ([-+a-z0-9]+),? ?(.+)?/)?.slice(1)
);

const run = (a: bigint, b: bigint): void => {
  for (let i = 0; i < instr.length; i++) {
    const curr = instr[i];
    if (curr === undefined) {
      p("error");
      break;
    }
    // p({curr, i })
    const [op, r, c] = curr;
    if (op === "hlf") {
      if (r === "a") {
        // a = Math.ceil(a / 2n);
        a = a / 2n;
      } else {
        b = b / 2n;
      }
    } else if (op === "tpl") {
      if (r === "a") {
        a = a * 3n;
      } else {
        b = b * 3n;
      }
    } else if (op === "inc") {
      if (r === "a") {
        a += 1n;
      } else {
        b += 1n;
      }
    } else if (op === "jmp") {
      const off = parseInt(r);
      i = i + off - 1;
    } else if (op === "jie") {
      if (r === "a" && a % 2n === 0n) {
        const off = parseInt(c);
        i = i + off - 1;
      } else if (r === "b" && b % 2n === 0n) {
        const off = parseInt(c);
        i = i + off - 1;
      }
    } else if (op === "jio") {
      if (r === "a" && a === 1n) {
        const off = parseInt(c);
        i = i + off - 1;
      } else if (r === "b" && b === 1n) {
        const off = parseInt(c);
        i = i + off - 1;
      }
    }
    // p({curr, i, a, b})
  }
  p({ b });
};

run(0n, 0n);
run(1n, 0n);
