// @flow
import git from 'nodegit';

export function getRepoInfo(path) {
  return (dispatch: (action: actionType) => void) => {
    console.log('GETTING REPO INFO');
    git.Repository.open(path)
      // Open the master branch.
      .then(repo => repo.getMasterCommit())
      // Display information about commits on master.
      .then(firstCommitOnMaster => {
        // Create a new history event emitter.
        const history = firstCommitOnMaster.history();

        // Create a counter to only show up to 9 entries.
        let count = 0;

        // Listen for commit events from the history.
        history.on('commit', commit => {
          // Disregard commits past 9.
          if (++count >= 9) {
            return;
          }

          // Show the commit sha.
          console.log(`commit ${commit.sha()}`);

          // Store the author object.
          const author = commit.author();

          // Display author information.
          console.log(`Author:\t${author.name()} <${author.email()}>`);

          // Show the commit date.
          console.log(`Date:\t${commit.date()}`);

          // Give some space and show the message.
          console.log(`\n    ${commit.message()}`);
        });

        // Start emitting events.
        history.start();
      });

    return dispatch({ type: 'SETTING_REPO_INFO' });
  };
}
E;

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

const gitActions = {
  getRepoInfo
};

export { gitActions };
