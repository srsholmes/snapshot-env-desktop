// @flow

import { ENV_PATH } from '../utils/globals';

const { readFile } = require('fs-extra');

export function setProjectPath(path) {
  return {
    type: 'SET_PROJECT_PATH',
    payload: {
      path
    }
  };
}
const DEFAULT_CONFIG = {
  build: 'npm run build',
  output: 'public'
};
const setConfigInfo = path => async (dispatch: action => void) => {
  let config = DEFAULT_CONFIG;
  try {
    const snapshotJson = await readFile(`${`${path}/${ENV_PATH}`}`);

    if (snapshotJson) {
      config = JSON.parse(snapshotJson);
    }
    return dispatch({
      type: 'SET_CONFIG_INFO',
      payload: {
        config: config || DEFAULT_CONFIG
      }
    });
  } catch (error) {
    return dispatch({
      type: 'SET_CONFIG_INFO',
      payload: {
        config: config || DEFAULT_CONFIG
      }
    });
  }
};

const initialState = {
  path: null,
  config: {
    build: null,
    output: null
  }
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case 'SET_PROJECT_PATH':
      return { ...state, path: action.payload.path };
    case 'SET_CONFIG_INFO':
      return { ...state, config: action.payload.config };
    default:
      return state;
  }
}

const projectActions = {
  setProjectPath,
  setConfigInfo
};

export { projectActions };
