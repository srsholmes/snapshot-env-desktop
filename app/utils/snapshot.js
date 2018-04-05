// @flow
import { copy, readFile, appendFile } from 'fs-extra';
import simpleGit from 'simple-git/promise';
import { shell } from 'electron';
import { TEMP_DIR } from '../utils/globals';
import promisify from '../utils/promisify';
import { globalActions } from '../reducers/global';

const exec = promisify(require('child_process').exec);
const { server } = require('../../server');

const { log } = console;
const separator = () => log('*'.repeat(80));
const { openModal, setSnapshotMessage } = globalActions;

// const warnIfUncommittedChanges = async commit => {
//   if (commit) {
//     log('Checking to see if current branch has unstaged changes...');
//     const { stdout } = await exec('git diff-index --quiet HEAD -- || echo "untracked"  >&1');
//     if (stdout) {
//       throw new Error(`You have uncommitted changes which would be lost by creating a snapshot of a different branch \n
//         Please either stash or commit your changes before creating a snapshot of a specific commit.`);
//     }
//   }
// };

const ignoreSnapshot = async (dispatch, path) => {
  separator();
  const name = '.gitignore';
  const theGitIgnorePath = `${`${path}/${name}`}`;
  const file = await readFile(theGitIgnorePath, 'utf8');
  const lines = file.split('\n');
  const isIgnored = lines.find(x => x === 'snapshots');
  if (!isIgnored) {
    dispatch(setSnapshotMessage('Adding snapshot to gitignore', 1));
    await appendFile(`${`${path}/${name}`}`, '\nsnapshots\n');
    const repo = await simpleGit(path);
    await repo.add('.gitignore');
    await repo.commit('added snapshot to .gitignore', '.gitignore');
  }
  log('Snapshot directory added to gitignore');
  dispatch(setSnapshotMessage('Snapshot directory added to gitignore', 2));
};

const checkoutGitCommit = async (dispatch, path, commit) => {
  if (commit) {
    const repo = await simpleGit(path);
    await repo.checkout(commit);
    dispatch(setSnapshotMessage(`Checking out commit ${commit}`, 3));
  }
};

const createLocalServer = async (dispatch, dir) => {
  separator();
  dispatch(
    setSnapshotMessage(
      'No custom server found, creating static hosted server',
      7
    )
  );
  const PORT = await server(dir);
  shell.openExternal(`http://localhost:${PORT}`);
  dispatch(
    setSnapshotMessage(`View local deploy here: http://localhost:${PORT}`, 8)
  );
};

const runBuildStep = async (dispatch, cmd, path) => {
  separator();
  dispatch(setSnapshotMessage('Running build process...', 4));
  const { stdout, stderr } = await exec(`${cmd} --prefix ${path}`, {
    shell: true,
    maxBuffer: 1024 * 8000,
  });
};

const copyBuildDir = async (dispatch, output, path, commitId) => {
  separator();
  dispatch(setSnapshotMessage('Copying output directory', 5));
  const dir = `${path}/${TEMP_DIR}/${commitId}`;
  await copy(`${path}/${output}`, dir);
  dispatch(setSnapshotMessage('Directory copied!', 6));
  return dir;
};

const revertGitCheckout = async (dispatch, branch, repo, err) => {
  await repo.checkout(branch);
  dispatch(
    setSnapshotMessage(
      `Reverting back to previous branch: ${branch}. ${err && err}`,
      10
    )
  );
};

const showSuccessMessage = async dispatch => {
  dispatch(setSnapshotMessage(`Successfully built snapshot 👍`, 11));
};

const snapshot = async ({ state, dispatch }) => {
  const { git, project, commitsTable } = state;
  const { repo, currentBranch } = git;

  // TODO: repo.cwd(workingDirectory), sets current working dir of repo.
  const { path, config } = project;
  const { selectedCommit } = commitsTable;
  const { build, output } = config;
  dispatch(openModal());

  try {
    await ignoreSnapshot(dispatch, path);
    // await warnIfUncommittedChanges(dispatch, commit);
    await checkoutGitCommit(dispatch, path, selectedCommit, repo);
    await runBuildStep(dispatch, build, path);
    const directoryToHost = await copyBuildDir(
      dispatch,
      output,
      path,
      selectedCommit
    );
    await createLocalServer(dispatch, directoryToHost);
    await revertGitCheckout(dispatch, currentBranch, repo);
    showSuccessMessage(dispatch);
  } catch (err) {
    dispatch(setSnapshotMessage(`ERROR`, err));
    await revertGitCheckout(dispatch, currentBranch, repo, err);
  }
};
export default snapshot;
