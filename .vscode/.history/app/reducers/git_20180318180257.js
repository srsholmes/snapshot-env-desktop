// @flow
import git from 'nodegit';
import { last, compose, split, tap } from 'ramda';

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
    const repo = await git.Repository.open(path);
    const branch = await repo.getCurrentBranch();
    const walker = git.Revwalk.create(repo);
    walker.pushGlob('refs/heads/*');
    const commitData = await walker.getCommitsUntil(c => true);
    const commits = commitData.map(x => ({
      commitId: x.sha(),
      commitMessage: x.message().split('\n')[0],
      commitDate: x.date().toString(),
      author: x.author().toString(),
      notes: randomComment()
    }));

    return dispatch({
      type: 'SETTING_REPO_INFO',
      payload: {
        branch,
        commits
      }
    });
  };
}

const runSnapshot = () => async (dispatch: action => void, getState) =>
  dispatch({
    type: 'RUNNING_SNAPSHOT',
    payload: {}
  });

const initialState = {
  branch: null,
  commits: []
};

export default function gitReducer(state = initialState, action) {
  switch (action.type) {
    case 'SETTING_REPO_INFO':
      return {
        ...state,
        commits: action.payload.commits
      };
    default:
      return state;
  }
}

const gitActions = {
  getRepoInfo
};

export { gitActions };
