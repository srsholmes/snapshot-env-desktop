// @flow

export function getRepoInfo(delay) {
  return (dispatch: (action: actionType) => void) => {
    console.log('GETTING RPO INFO');
    return dispatch({ type: 'SETTING_REPO_INFO' });
  };
}

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
