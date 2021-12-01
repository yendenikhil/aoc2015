const p = console.log;
const raw = "hepxcrrq";

const nextPass = (input: string): string => {
  const nextL = (x: string): string => {
    if (x[0] === "z") return "a";
    else {
      const curr = x.codePointAt(0) ?? 0;
      return String.fromCodePoint(curr + 1);
    }
  };
  let change = true;
  const newPass = [];
  for (const s of input.split("").reverse()) {
    if (change) {
      newPass.push(nextL(s));
    } else {
      newPass.push(s);
    }
    if (s !== "z") change = false;
  }
  return newPass.reverse().join("");
};

const rule1 = (input: string): boolean => {
  for (let i = 0; i < input.length - 2; i++) {
    const one = input.codePointAt(i) ?? 0;
    const two = input.codePointAt(i + 1) ?? 0;
    const three = input.codePointAt(i + 2) ?? 0;
    if (three - two === 1 && two - one === 1) return true;
  }
  return false;
};

const rule2 = (input: string): boolean => input.search(/[iol]/) === -1;
const rule3 = (input: string): boolean => {
  const match = input.match(/([a-z])\1/g);
  if (match && match.length > 1) {
    return match[0] !== match[1];
  }
  return false;
};

const validPass = (input: string): string => {
  let pass = input;
  while (true) {
    const nextpass = nextPass(pass);
    if (rule1(nextpass) && rule2(nextpass) && rule3(nextpass)) return nextpass;
    pass = nextpass;
  }
};

p(validPass(raw));
p(validPass(validPass(raw)));
