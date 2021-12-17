interface Effect {
  name: string;
  turns: number;
  cost: number;
  dmg: number;
  heal: number;
  armor: number;
  mana: number;
}

interface Stat {
  hp: number;
  mana: number;
  spent: number;
  dmg: number;
  armor: number;
  spells: string[];
  effects: Effect[];
}

const playernew = (): Stat => {
  return {
    hp: 50,
    mana: 500,
    spent: 0,
    dmg: 0,
    armor: 0,
    effects: [],
    spells: [],
  };
};

const monsternew = (): Stat => {
  return {
    hp: 58,
    dmg: 9,
    armor: 0,
    mana: 0,
    spent: 0,
    effects: [],
    spells: [],
  };
};

const effectcopy = (e: Effect): Effect => {
  return {
    name: e.name,
    turns: e.turns,
    cost: e.cost,
    dmg: e.dmg,
    heal: e.heal,
    armor: e.armor,
    mana: e.mana,
  };
};

const playercopy = (p: Stat): Stat => {
  return {
    hp: p.hp,
    mana: p.mana,
    dmg: p.dmg,
    armor: p.armor,
    spent: p.spent,
    effects: p.effects.map(effectcopy),
    spells: p.spells.slice(),
  };
};

const monstercopy = (m: Stat): Stat => {
  return {
    hp: m.hp,
    mana: 0,
    dmg: m.dmg,
    armor: m.armor,
    spent: 0,
    effects: [],
    spells: [],
  };
};

const effects: Effect[] = [];
effects.push(
  {
    name: "Magic Missile",
    turns: 1,
    cost: 53,
    dmg: 4,
    heal: 0,
    armor: 0,
    mana: 0,
  } as Effect,
);
effects.push(
  {
    name: "Drain",
    turns: 1,
    cost: 73,
    dmg: 2,
    heal: 2,
    armor: 0,
    mana: 0,
  } as Effect,
);
effects.push(
  {
    name: "Shield",
    turns: 6,
    cost: 113,
    dmg: 0,
    heal: 0,
    armor: 7,
    mana: 0,
  } as Effect,
);
effects.push(
  {
    name: "Poison",
    turns: 6,
    cost: 173,
    dmg: 3,
    heal: 0,
    armor: 0,
    mana: 0,
  } as Effect,
);
effects.push(
  {
    name: "Recharge",
    turns: 5,
    cost: 229,
    dmg: 0,
    heal: 0,
    armor: 0,
    mana: 101,
  } as Effect,
);

const dmgcalc = (dmg: number, armor: number): number => {
  const cost = dmg - armor;
  return cost > 0 ? cost : 1;
};

const applyEffect = (p: Stat, m: Stat): void => {
  p.effects.forEach((e) => {
    if (e.dmg > 0) {
      m.hp -= dmgcalc(e.dmg, m.armor);
    }
    if (e.heal > 0) {
      p.hp += e.heal;
    }
    if (e.mana > 0) {
      p.mana += e.mana;
    }
    e.turns -= 1;
  });
  p.effects = p.effects.filter((e) => e.turns > 0);
};
const adder = (a: number, b: number): number => a + b;
const turn = (attacker: Stat, defender: Stat): void => {
  const dmg = attacker.dmg;
  const armor = defender.armor +
    defender.effects.map((e) => e.armor).reduce(adder, 0);
  defender.hp -= dmgcalc(dmg, armor);
};
const isWin = (m: Stat): boolean => m.hp <= 0;
const isLoss = (p: Stat): boolean => p.hp <= 0 || p.mana < 53;
const isEffectNotInUse = (s: Stat) =>
  (e: Effect): boolean =>
    !s.effects.some((ee) => ee.name === e.name) && s.mana > e.cost;
const newspell = (p: Stat, e: Effect): void => {
  p.spent += e.cost;
  p.mana -= e.cost;
  p.effects.push(effectcopy(e));
  p.spells.push(e.name);
};

const solve = (isP2: boolean): void => {
  const queue = [[playernew(), monsternew()]];
  const wins: number[] = [];
  let counter = 0;
  while (queue.length > 0) {
    counter++;
    // if (counter === 200000) break;
    const currraw = queue.shift();
    if (currraw === undefined) {
      console.log("ERROR");
      break;
    }
    const [p, m] = currraw;
    // if (counter % 10000 === 0)
    // console.log({counter, p,m, q: queue.length });
    const effCheck = isEffectNotInUse(p);
    if (isP2) {
      p.hp -= 1;
      if (isLoss(p)) continue;
    }
    applyEffect(p, m);

    effects
      .filter(effCheck)
      .map((e) => {
        const newp = playercopy(p);
        newspell(newp, e);
        return [newp, monstercopy(m)];
      }).forEach(([np, nm]) => {
        applyEffect(np, nm);
        if (isWin(nm)) {
          // console.log({np, nm})
          wins.push(np.spent);
        } else {
          turn(nm, np);
          if (!isLoss(np)) {
            queue.push([np, nm]);
          }
        }
      });
    if (wins.length > 0) break;
  }
  if (isP2) {
    console.log({ p2: wins[0] });
  } else {
    console.log({ p1: wins[0] });
  }
};

console.time("a");
solve(false);
console.timeLog("a");
solve(true);
console.timeEnd("a");
