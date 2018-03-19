// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import git from './git';

const rootReducer = combineReducers({
  git,
  router
});

export default rootReducer;
