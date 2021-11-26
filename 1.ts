const raw = await Deno.readTextFile("1.in");
const p = console.log;

const part1 = (raw: string) => {
  const up = raw.split("").filter((c) => c === "(").length;
  const down = raw.split("").filter((c) => c === ")").length;
  p(up - down);
};

const part2 = (raw: string) => {
  const steps = raw.split("");
  let counter = 0;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i] === "(") {
      counter++;
    } else {
      counter--;
    }
    if (counter === -1) {
      p(i + 1);
      break;
    }
  }
};

part1(raw);
part2(raw);
