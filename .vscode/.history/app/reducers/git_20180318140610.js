// @flow
import git from 'nodegit';

export function getRepoInfo(path) {
  return (dispatch: (action: actionType) => void) => {
    console.log('GETTING REPO INFO');
    return dispatch({ type: 'SETTING_REPO_INFO' });
  };
}
E;

const initialState = {
  commits: []
};

export default function git(state = initialState, action) {
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
