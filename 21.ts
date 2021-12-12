const p = console.log;
interface RPG {
  health: number;
  damage: number;
  armor: number;
  gold: number;
}
const boss = (): RPG => {
  return { health: 100, damage: 8, armor: 2, gold: 0 };
};
const player = (g: number, d: number, a: number): RPG => {
  return { health: 100, damage: d, armor: a, gold: g };
};

const battle = (pl: RPG, b: RPG): boolean => {
  // p('=============')
  while (pl.health > 0 && b.health > 0) {
    const bossD = b.damage - pl.armor;
    const playerD = pl.damage - b.armor;
    pl.health -= bossD > 1 ? bossD : 1;
    b.health -= playerD > 1 ? playerD : 1;
    // p({pl, b})
  }
  return b.health < 1;
};
type Shop = [number, number, number]; // gold, damage, armor
const weapons: number[][] = [[8, 4, 0], [10, 5, 0], [25, 6, 0], [40, 7, 0], [
  74,
  8,
  0,
]];
const armors: number[][] = [[13, 0, 1], [31, 0, 2], [53, 0, 3], [75, 0, 4], [
  102,
  0,
  5,
]];
const rings: number[][] = [[25, 1, 0], [50, 2, 0], [100, 3, 0], [20, 0, 1], [
  40,
  0,
  2,
], [80, 0, 3]];

const poss: number[][] = [];

// one weapon
poss.push(...weapons);
// zero or one armor
const t1: number[][] = [];
poss.forEach(([a1, a2, a3]) =>
  t1.push(...armors.map(([b1, b2, b3]) => [a1 + b1, a2 + b2, a3 + b3]))
);
poss.push(...t1);
// zero, one or two rings
// one ring
const t2: number[][] = [];
poss.forEach(([a1, a2, a3]) =>
  t2.push(...rings.map(([b1, b2, b3]) => [a1 + b1, a2 + b2, a3 + b3]))
);
// two rings
for (let i = 0; i < rings.length - 1; i++) {
  for (let j = i + 1; j < rings.length; j++) {
    const [c1, c2, c3] = rings[i];
    const [b1, b2, b3] = rings[j];
    poss.forEach(([a1, a2, a3]) =>
      t2.push([a1 + b1 + c1, a2 + b2 + c2, a3 + b3 + c3])
    );
  }
}
poss.push(...t2);

const wins = poss.map(([g, d, a]) => player(g, d, a)).filter((pp) =>
  battle(pp, boss())
);
p(wins.reduce((acc, x) => acc.gold > x.gold ? x : acc));

const losses = poss.map(([g, d, a]) => player(g, d, a)).filter((pp) =>
  !battle(pp, boss())
);
p(losses.reduce((acc, x) => acc.gold < x.gold ? x : acc));
