// @flow
import Git from 'nodegit';

const getMostRecentCommit = function (repository) {
  return repository.getBranchCommit('master');
};

const getCommitMessage = function (commit) {
  return commit.message();
};

export function getRepoInfo(path) {
  return (dispatch: action => void) => {
    console.log('GETTING REPO INFO');

    Git.Repository.open(path)
      .then(getMostRecentCommit)
      .then(getCommitMessage)
      .then(message => {
        console.log('COMMIT MESSAGE');
        console.log(message);
      });

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
