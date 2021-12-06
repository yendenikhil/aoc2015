const p = console.log;
const raw = await Deno.readTextFile("14.txt");
const lines = raw.trim().split("\n");
interface R {
  name: string;
  speed: number[];
  cycle: number;
}
const deers = lines.map((line) =>
  line.match(/^(\w+) can fly (\d+) km.s for (\d+) .* (\d+) seconds./)
)
  .map((m) => {
    if (m) {
      const sp = parseInt(m[2]);
      const speed = [];
      for (let i = 0; i < parseInt(m[3]); i++) {
        speed.push(sp);
      }
      for (let i = 0; i < parseInt(m[4]); i++) {
        speed.push(0);
      }
      return {
        name: m[1],
        speed,
        cycle: speed.length,
      } as R;
    } else return;
  }).filter((d) => d);

const pos = deers.map((d) => {
  const dist = [0];
  if (d !== undefined) {
    for (let i = 0; i < 2503; i++) {
      dist.push(dist[i] + d.speed[i % d.cycle]);
    }
  }
  return dist;
});

p(pos.map((d) => d[2503]).reduce((max, d) => max < d ? d : max, 0));

const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let i = 1; i <= 2503; i++) {
  let max = pos[0][i];
  for (let j = 1; j < 9; j++) {
    if (max < pos[j][i]) {
      max = pos[j][i];
    }
  }
  for (let j = 1; j < 9; j++) {
    if (max === pos[j][i]) {
      scores[j] += 1;
    }
  }
}
p(scores.reduce((max, curr) => max < curr ? curr : max, 0));
