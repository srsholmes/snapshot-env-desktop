// @flow
import git from 'nodegit';
import { last, compose, split, tap } from 'ramda';

export function getRepoInfo([path]) {
  return async (dispatch: action => void) => {
    const repo = await git.Repository.open(path);
    const branch = await repo.getCurrentBranch();
    const ben = branch.name();

    const walker = git.Revwalk.create(repo);
    walker.pushGlob('refs/heads/*');
    const commits = await walker.getCommitsUntil(c => true).map(x => ({
      sha: x.sha(),
      msg: x.message().split('\n')[0],
      date: x.date(),
      author: x.author(),
      repo: compose(last, split('/'))(path)
    }));

    return dispatch({
      type: 'SETTING_REPO_INFO',
      payload: {
        commits
      }
    });
  };
}

const initialState = {
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
