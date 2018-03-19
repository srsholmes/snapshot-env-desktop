const chalk = require('chalk');

import { ENV_PATH, TEMP_DIR } from '../utils/globals';

const {
  readFileSync, copy, exists, copyFile, readFile, appendFile
} = require('fs-extra');

import promisify from '../utils/promisify';

const exec = promisify(require('child_process').exec);
const { fork } = require('child_process');

const { server } = require('../../server');
const { Checkout } = require('nodegit');

const remote = require('electron').remote;

const BrowserWindow = remote.BrowserWindow;

const info = chalk.blue;
const go = chalk.green;
const error = chalk.bold.red;
const { log } = console;
const separator = () => log('*'.repeat(80));
let testWindow;
const openNewWindow = port => {
  console.log('Opening new window....');
  console.log({ port });
  testWindow = new BrowserWindow({
    frame: true,
    show: true,
    width: 800,
    height: 400
  });

  testWindow.loadURL(`http://localhost:${port}/`);

  testWindow.webContents.on('did-finish-load', () => {
    if (!testWindow) {
      throw new Error('"testWindow" is not defined');
    }
    testWindow.show();
    testWindow.focus();
  });

  testWindow.on('closed', () => {
    testWindow = null;
  });
};

// const getCurrentGitBranch = async () => {
//   log(info('Getting current git branch'));
//   const { stdout } = await exec('git rev-parse --abbrev-ref HEAD');
//   return stdout;
// };

// const warnIfUncommittedChanges = async commit => {
//   if (commit) {
//     log(info('Checking to see if current branch has unstaged changes...'));
//     const { stdout } = await exec('git diff-index --quiet HEAD -- || echo "untracked"  >&1');
//     if (stdout) {
//       throw new Error(`You have uncommitted changes which would be lost by creating a snapshot of a different branch \n
//         Please either stash or commit your changes before creating a snapshot of a specific commit.`);
//     }
//   }
// };

// const revertGitCheckout = async branch => {
//   if (branch) {
//     log(info(`Reverting back to previous branch: ${branch}`));
//     const { stdout } = await exec(`git checkout ${branch}`);
//     log(('Output:', stdout));
//   }
// };

// const copyServerFile = async serverFile => {
//   const path = `${process.cwd()}/${serverFile}`;
//   const serverExists = await exists(path);
//   if (serverExists) {
//     await copyFile(serverFile, `${process.cwd()}/${SNAPSHOT}/${serverFile}`);
//   } else {
//     throw new Error('Specified server in config not found');
//   }
// };

// function runScript(scriptPath, cb) {
//   let invoked = false;
//   const process = fork(scriptPath);
//   process.on('error', err => {
//     if (invoked) return;
//     invoked = true;
//     cb(err);
//   });

//   process.on('exit', code => {
//     if (invoked) return;
//     invoked = true;
//     const err = code === 0 ? null : new Error(`exit code ${code}`);
//     cb(err);
//   });
// }

// const startServer = async serverFile => {
//   const path = `${process.cwd()}/${serverFile}`;
//   const server = await fork(path);
//   log(info(server));
//   runScript(serverFile, err => {
//     if (err) throw err;
//   });
//   log(info('Custom Server started'));
// };

// const ignoreSnapshot = async () => {
//   separator();
//   const name = '.gitignore';
//   const file = await readFile(name, 'utf8');
//   const isIgnored = file.split('\n').find(x => x === 'snapshot');
//   if (!isIgnored) {
//     log(info('Adding snapshot to gitignore...'));
//     await appendFile(name, '\nsnapshot\n');
//     await exec("git add . && git commit -m 'added snapshot to .gitignore'");
//   }
//   log(info('Snapshot directory added to gitignore'));
// };

// const useLocalServer = async server => {
//   separator();
//   log('Custom server found, copying server');
//   await copyServerFile(server);
//   await startServer(server);
//   log(info('Custom server started....'));
// };

const checkoutGitCommit = async (path, commit, repo) => {
  if (commit) {
    console.log({ path });
    const simpleGit = require('simple-git')(path);
    simpleGit.checkout(commit, res => {
      console.log('CHECKED OUT COMMIT', commit);
    });
  }
};

const createLocalServer = async (dir, path) => {
  separator();
  log('No custom server found, creating static hosted server');
  const PORT = await server(dir);
  await openNewWindow(PORT);
  log(go(`View local deploy here: http://localhost:${PORT}`));
};

const runBuildStep = async (cmd, path) => {
  separator();
  log('Running build process...');
  console.log({ cmd, path });
  const { stdout, stderr } = await exec(`${cmd} --prefix ${path}`, {
    maxBuffer: 1024 * 8000
  });
  log(('Output:', stdout));
  log(error('stderr:', stderr));
};

const copyBuildDir = async (output, path, commitId) => {
  separator();
  log(info('Copying output directory...........!'));
  // const { stdout } = await exec("git log --pretty=format:'%h' -n 1");
  const dir = `${path}/${TEMP_DIR}/${commitId}`;
  await copy(`${path}/${output}`, dir);
  log(info('Directory copied!'));
  return dir;
};

const snapshot = async ({ state, dispatch }) => {
  const { git, project, commitsTable } = state;
  const { repo } = git;
  const { path } = project;
  const { row: { commitId } } = commitsTable;
  const snapshotJson = await readFile(`${`${path}/${ENV_PATH}`}`);
  const config = JSON.parse(snapshotJson);
  const { build, output } = config;
  console.log('****************');
  console.log({ repo, build, output });
  //   const currentBranch = await getCurrentGitBranch();
  try {
    // await ignoreSnapshot();
    // await warnIfUncommittedChanges(commit);
    const blob = await checkoutGitCommit(path, commitId, repo);
    console.log('BLOB');
    console.log({ blob });
    await runBuildStep(build, path);
    const directoryToHost = await copyBuildDir(output, path);
    // if (server) {
    //   await useLocalServer(server);
    // } else {
    await createLocalServer(directoryToHost, path);
    // }
  } catch (err) {
    log(error(err));
  } finally {
    console.log('FINALLY');
    // await revertGitCheckout(currentBranch);
  }
};
export default snapshot;
