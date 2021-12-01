const p = console.log;
const raw = "1321131112";

const lookAndSay = (input: string): string => {
  const match = input.match(/(\d)(\1)*/g);
  if (!match) return "";
  return match.map((e) => String(e.length) + e[0]).join("");
};

const solve = (input: string, itr: number): string => {
  let curr = input;
  for (let i = 0; i < itr; i++) {
    curr = lookAndSay(curr);
  }
  return curr;
};
p(solve(raw, 40).length);
p(solve(raw, 50).length);
