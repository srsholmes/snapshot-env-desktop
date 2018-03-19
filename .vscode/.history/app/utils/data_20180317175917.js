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
  return {
    author: c.name(),
    commitMessage: c.paragraph(),
    commitId: c.hash(),
    commitDate: c.date({ string: true, american: false, year: 2018 }),
    notes: c.paragraph(),
    reviewed: c.integer({min: 0, max: 4});
  };
};

export function makeData(len = 50) {
  return range(len).map(d => ({
    ...newPerson()
  }));
}
