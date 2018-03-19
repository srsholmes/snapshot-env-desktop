// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import git from './git';
import project from './project';

const rootReducer = combineReducers({
  git,
  project,
  router
});

export default rootReducer;
