// @flow
import git from 'nodeg'it;
export function getRepoInfo(path) {
  return (dispatch: action => void) => {
    console.log('GETTING REPO INFO');

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
