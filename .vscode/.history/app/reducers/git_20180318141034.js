// @flow
import git from 'nodegit';

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
