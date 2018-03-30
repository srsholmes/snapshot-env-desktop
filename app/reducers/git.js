// @flow
import snapshot from '../utils/snapshot';

const simpleGit = require('simple-git/promise');

export function getRepoInfo(path) {
  return async (dispatch: action => void) => {
    const repo = await simpleGit(path);
    const branch = await repo.branch();
    const logs = await repo.log();

    const commits = logs.all.map(x => ({
      id: x.hash,
      commitId: x.hash,
      commitMessage: x.message,
      commitDate: x.date,
      author: x.author_name,
      authorEmail: x.author_email,
    }));

    return dispatch({
      type: 'SETTING_REPO_INFO',
      payload: {
        currentBranch: branch.current,
        commits,
        repo,
      },
    });
  };
}

const runSnapshot = () => async (dispatch: action => void, getState) => {
  const state = getState();

  await snapshot({
    state,
    dispatch,
  });

  return dispatch({
    type: 'RUNNING_SNAPSHOT',
    payload: {},
  });
};

const initialState = {
  branch: null,
  commits: [],
};

export default function gitReducer(state = initialState, action) {
  switch (action.type) {
    case 'SETTING_REPO_INFO':
      return {
        ...state,
        commits: action.payload.commits, // Read only state from snapshot.
        repo: action.payload.repo,
        currentBranch: action.payload.currentBranch,
      };
    case 'ORDER_BY': {
      return state;
    }
    default:
      return state;
  }
}

const gitActions = {
  getRepoInfo,
  runSnapshot,
};

export { gitActions };
