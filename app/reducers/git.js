// @flow
import bugsnag from 'bugsnag';
import snapshot from '../utils/snapshot';
import { globalActions } from './global';

const simpleGit = require('simple-git/promise');

export function getRepoInfo(path) {
  return async (dispatch: action => void, getState) => {
    dispatch(globalActions.openModal('Please wait ⏳'));
    try {
      const repo = await simpleGit(path);
      console.log('************');
      console.log({ repo });
      console.log(1);
      await repo.reset('HARD');
      console.log(2);
      await repo.checkout('master');
      console.log(3);
      await repo.pull();
      console.log(4);
      await repo.fetch(['-ap']);
      console.log(5);
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

      if (branchesWithoutRemote) {
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
      const repo = await simpleGit(path);
      console.log('ERROR', err);
      dispatch(globalActions.setSnapshotMessage(err, 10));
      bugsnag.notify(new Error(err), { state: getState(), repo });
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
