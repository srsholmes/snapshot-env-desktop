const Chance = require('chance');

const c = new Chance();

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    author: c.name(),
    commitMessage: c.paragraph(),
    commitId: c.hash(),
    commitDate: c.date({ string: true, american: false }),
    notes: c.paragraph()
  };
};

export function makeData(len = 50) {
  return range(len).map(d => ({
    ...newPerson()
  }));
}
