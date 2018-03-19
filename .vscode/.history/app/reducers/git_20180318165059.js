// @flow
import git from 'nodegit';

export function getRepoInfo(path) {
  return async (dispatch: action => void) => {
    console.log('GETTING REPO INFO');
    console.log(git);
    const repo = await git.Repository.open(path[0]);
    console.log({ repo });
    const branch = await repo.getCurrentBranch();

    const ben = branch.name();

    console.log({ branch, ben, remote });

    return dispatch({ type: 'SETTING_REPO_INFO' });
  };
}

const initialState = {
  commits: []
};

export default function gitReducer(state = initialState, action) {
  switch (action.type) {
    case 'SETTING_REPO_INFO':
      return state;
    default:
      return state;
  }
}

const gitActions = {
  getRepoInfo
};

export { gitActions };
