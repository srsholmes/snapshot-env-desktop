// @flow
import bugsnag from 'bugsnag';
import snapshot from '../utils/snapshot';
import { globalActions } from './global';

const simpleGit = require('simple-git/promise');

// Command to get all the branches on the ref and sort them by date.
// /git for-each-ref --sort='committerdate:iso8601' --format='%(align:width=40)%(refname:short)%(end)%(committerdate:relative)' --no-merged origin/master refs/remotes/origin

// Get the git directory.
// git rev-parse --show-toplevel

export function getRepoInfo(path) {
  return async (dispatch: action => void) => {
    dispatch(globalActions.openModal('Please wait ⏳'));
    try {
      const repo = await simpleGit(path);
      await repo.pull();
      await repo.fetch(['-ap']);
      const branch = await repo.branch();

      const branchesWithoutRemote = Object.entries(branch.branches).reduce(
        (acc, curr) => {
          const [key, val] = curr;
          if (!key.includes('remotes/origin/')) return acc;
          return {
            ...acc,
            [key]: val,
          };
        },
        {}
      );

      console.log({ branch, branchesWithoutRemote });

      console.log('inside the try');
      if (branchesWithoutRemote) {
        console.log('inside the if');
        const commits = await Promise.all(
          Object.entries(branchesWithoutRemote).map(async ([_, val]) => {
            const info = await repo.log([val.commit]);
            const { latest } = info;
            return {
              id: latest.hash,
              commitId: latest.hash,
              branch: val.name,
              commitMessage: val.label,
              commitDate: latest.date,
              author: latest.author_name,
              authorEmail: latest.author_email,
            };
          })
        );
        dispatch(globalActions.closeModal());
        return dispatch({
          type: 'SETTING_REPO_INFO',
          payload: {
            currentBranch: branch.current,
            commits,
            repo,
          },
        });
      }
    } catch (err) {
      console.log('ERROR', err);
      dispatch(globalActions.setSnapshotMessage(err.toString(), 10));
      bugsnag.notify(new Error(err));
    }
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
