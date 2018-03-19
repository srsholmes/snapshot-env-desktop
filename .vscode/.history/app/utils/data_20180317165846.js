import { date, paragraph, time, first, last, hash } from 'chance';

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
    firstName: first(),
    lastName: last(),
    commitMessage: paragraph(),
    commitId: hash(),
    commitDate: date({ string: true, american: false }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single'
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => ({
    ...newPerson(),
    children: range(10).map(newPerson)
  }));
}
