// @flow
import { copy, pathExists } from 'fs-extra';
import { shell } from 'electron';
import promisify from '../utils/promisify';
import { globalActions } from '../reducers/global';

const { remote } = require('electron');

const { app } = remote;

const exec = promisify(require('child_process').exec);
const { server } = require('../../server');

const { log } = console;
const separator = () => log('*'.repeat(80));
const { openModal, setSnapshotMessage, setAppServer } = globalActions;

const checkoutGitCommit = async (dispatch, path, commit, repo) => {
  if (commit) {
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
  const { port, app, ngrok } = await server(dir);
  shell.openExternal(`http://localhost:${port}`);
  dispatch(
    setAppServer({
      ngrok,
      appServer: app,
    })
  );
  dispatch(
    setSnapshotMessage(`View local deploy here: http://localhost:${port}`, 8)
  );
  return { port, app, ngrok };
};

const runBuildStep = async (dispatch, cmd, path) => {
  separator();
  dispatch(setSnapshotMessage('Running build process...', 4));
  await exec(`${cmd} --prefix ${path}`, {
    shell: true,
    maxBuffer: 1024 * 8000,
  });
};

const copyBuildDir = async (dispatch, output, path, commitId) => {
  separator();
  dispatch(setSnapshotMessage('Copying output directory', 5));
  const electronPath = `${`${app.getPath('userData')}/${commitId}`}`;
  await copy(`${path}/${output}`, electronPath);
  dispatch(setSnapshotMessage('Directory copied!', 6));
  return electronPath;
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

const showSuccessMessage = async (dispatch, port, nGrokUrl) => {
  dispatch(
    setSnapshotMessage(
      `Successfully built snapshot 👍. \n
      View on http://localhost:${port} \n
      or externally on ${nGrokUrl}`,
      11
    )
  );
};

const checkForNodeModules = async (dispatch, path) => {
  const folderExists = await pathExists(`${path}/node_modules`);
  dispatch(setSnapshotMessage('Checking for dependencies', 1));
  if (!folderExists) {
    dispatch(
      setSnapshotMessage(
        'Installing dependencies, this might take a while 🕐',
        1
      )
    );
    await exec(`npm install --prefix ${path}`);
  }
  dispatch(setSnapshotMessage('Dependencies Installed', 1));
};
const snapshot = async ({ state, dispatch }) => {
  const { git, project, commitsTable, global } = state;
  const { repo, currentBranch } = git;
  // TODO: repo.cwd(workingDirectory), sets current working dir of repo.
  const { path, config } = project;
  const { selectedCommit } = commitsTable;
  const { build, output } = config;
  const { appServer } = global.server;
  dispatch(openModal('Building your snapshot 😊'));
  if (appServer) {
    appServer.close(() => {
      dispatch(setSnapshotMessage(`Removing previous hosted snapshot`));
    });
    dispatch(setAppServer({ appServer: null, ngrok: null }));
  }
  try {
    await checkForNodeModules(dispatch, path);
    // await warnIfUncommittedChanges(dispatch, commit);
    await checkoutGitCommit(dispatch, path, selectedCommit, repo);
    await runBuildStep(dispatch, build, path);
    const directoryToHost = await copyBuildDir(
      dispatch,
      output,
      path,
      selectedCommit
    );
    const { port, ngrok } = await createLocalServer(dispatch, directoryToHost);
    await revertGitCheckout(dispatch, currentBranch, repo);
    showSuccessMessage(dispatch, port, ngrok.url);
  } catch (err) {
    console.log('**************');
    console.log(err);
    dispatch(setSnapshotMessage(`ERROR`, err));
    await revertGitCheckout(dispatch, currentBranch, repo, err);
  }
};
export default snapshot;
