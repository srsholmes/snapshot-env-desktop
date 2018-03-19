// @flow


export function getRepoInfo(delay) {
  return (dispatch: (action: actionType) => void) => {
    console.log('GETTING RPO INFO');
  };
}

const initialState = {
  commits: []
};
export default function git(state = initialState, action) {
  switch (action.type) {
    case :
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
