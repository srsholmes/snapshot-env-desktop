// @flow
import snapshot from '../utils/snapshot';

const simpleGit = require('simple-git/promise');
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

export function getRepoInfo(path) {
  return async (dispatch: action => void) => {
    const repo = await simpleGit(path);
    const branch = await repo.branch();
    const logs = await repo.log();

    const commits = logs.all.map(x => ({
      commitId: x.hash,
      commitMessage: x.message,
      commitDate: x.date,
      author: x.author_name,
      authorEmail: x.author_email,
      notes: randomComment()
    }));

    return dispatch({
      type: 'SETTING_REPO_INFO',
      payload: {
        branch,
        commits,
        repo
      }
    });
  };
}

const runSnapshot = (commitId = '12345') => async (dispatch: action => void, getState) => {
  const state = getState();

  await snapshot({
    state,
    dispatch
  });

  return dispatch({
    type: 'RUNNING_SNAPSHOT',
    payload: {}
  });
};

const initialState = {
  branch: null,
  commits: []
};

export default function gitReducer(state = initialState, action) {
  switch (action.type) {
    case 'SETTING_REPO_INFO':
      return {
        ...state,
        commits: action.payload.commits,
        repo: action.payload.repo
      };
    default:
      return state;
  }
}

const gitActions = {
  getRepoInfo,
  runSnapshot
};

export { gitActions };
