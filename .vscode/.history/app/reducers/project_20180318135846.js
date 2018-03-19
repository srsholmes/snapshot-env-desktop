// @flow

export function setProjectPath(path) {
  return {
    type: 'SET_PROJECT_PATH',
    payload: {
      path
    }
  };
}

const initialState = {
  path: null
};

export default function git(state = initialState, action) {
  switch (action.type) {
    case 'SET_PROJECT_PATH':
      return { ...state, path: action.payload.path };
    default:
      return state;
  }
}

const gitActions = {
  setProjectPath
};

export { gitActions };
