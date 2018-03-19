const Chance = require('chance');

const c = new Chance();

const getRandomNote = arr => {
  let copy = arr.slice(0);
  return function () {
    if (copy.length < 1) {
      copy = arr.slice(0);
    }
    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];
    copy.splice(index, 1);
    return item;
  };
};

const NOTES = [
  'Looks great 😊',
  'Needs more work',
  'Broken on Android 😕',
  'Header needs tweaking',
  'Crashed my chrome',
  'Ship it',
  'Has been reviewed 😊',
  `See jira VP-${c.integer({ min: 100, max: 150 })}`,
  'Love it ❤️'
];
const randomComment = getRandomNote(NOTES);

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => ({
  author: c.name(),
  commitMessage: c.paragraph(),
  commitId: c.hash(),
  commitDate: c.date({ string: true, american: false, year: 2018 }),
  reviewed: c.integer({ min: 0, max: 2 }),
  notes: randomComment()
});

export function makeData(len = 50) {
  return Array.from({ length: len}, (x,i) => {
    return newPerson()
  }));
