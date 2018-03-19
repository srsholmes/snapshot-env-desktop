// @flow
import git from 'nodegit';
import { last, compose, head, split, tap } from 'ramda';

export function getRepoInfo([path]) {
  return async (dispatch: action => void) => {
    const repoName = compose(last, tap(console.log), split('/'), tap(console.log), head)(path);
    console.log('GETTING REPO INFO');
    console.log(git);
    const repo = await git.Repository.open(path);
    console.log({ repo });
    const branch = await repo.getCurrentBranch();
    const ben = branch.name();

    const walker = git.Revwalk.create(repo);
    walker.pushGlob('refs/heads/*');
    const commits = await walker.getCommitsUntil(c => true);
    const cmts = commits.map(x => ({
      sha: x.sha(),
      msg: x.message().split('\n')[0],
      date: x.date(),
      author: x.author(),
      repo: repoName
    }));

    console.log({ branch, ben, cmts });

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
