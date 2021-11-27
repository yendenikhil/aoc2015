import { createHash } from "https://deno.land/std@0.116.0/hash/mod.ts";
const raw = "bgvyzdsv";
const p = console.log;

let counter = 1;
while (true) {
  const hash = createHash("md5");
  hash.update(raw + counter);
  const hh = hash.toString();
  if (hh.search(/^00000/) > -1) {
    p({ counter });
    break;
  } else {
    counter++;
  }
}
while (true) {
  const hash = createHash("md5");
  hash.update(raw + counter);
  const hh = hash.toString();
  if (hh.search(/^000000/) > -1) {
    p({ counter });
    break;
  } else {
    counter++;
  }
}
