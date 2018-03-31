// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import git from './git';
import global from './global';
import project from './project';
import commitsTable from './commitsTable';

const rootReducer = combineReducers({
  commitsTable,
  git,
  global,
  project,
  router,
});

export default rootReducer;
