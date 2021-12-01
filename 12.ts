const p = console.log;

const raw = await Deno.readTextFile("12.txt");

const getNumbers = (obj: any, useFilter = false): number => {
  if (Array.isArray(obj)) {
    return obj.map((e) => getNumbers(e, useFilter)).reduce((a, b) => a + b, 0);
  } else if (typeof obj === "object") {
    let sum = 0;
    for (const prop in obj) {
      if (useFilter && obj[prop] === "red") {
        sum = 0;
        break;
      }
      sum += getNumbers(obj[prop], useFilter);
    }
    return sum;
  } else if (typeof obj === "number") {
    return obj;
  } else {
    return 0;
  }
};

const ans1 = getNumbers(JSON.parse(raw));
p(ans1);
const ans2 = getNumbers(JSON.parse(raw), true);
p(ans2);
