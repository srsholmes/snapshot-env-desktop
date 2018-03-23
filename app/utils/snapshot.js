import { ENV_PATH, TEMP_DIR } from '../utils/globals';
import promisify from '../utils/promisify';

const simpleGit = require('simple-git/promise');
const { remote, shell } = require('electron');
const exec = promisify(require('child_process').exec);
const {
  readFileSync, copy, exists, copyFile, readFile, appendFile
} = require('fs-extra');
const { server } = require('../../server');

const { log } = console;
const separator = () => log('*'.repeat(80));

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
//   log(server);
//   runScript(serverFile, err => {
//     if (err) throw err;
//   });
//   log('Custom Server started');
// };

const ignoreSnapshot = async path => {
  separator();
  const name = '.gitignore';
  const theGitIgnorePath = `${`${path}/${name}`}`;
  const file = await readFile(theGitIgnorePath, 'utf8');
  const lines = file.split('\n');
  const isIgnored = lines.find(x => x === 'snapshots');
  if (!isIgnored) {
    log('Adding snapshot to gitignore...');
    await appendFile(`${`${path}/${name}`}`, '\nsnapshots\n');
    const repo = await simpleGit(path);
    await repo.add('.gitignore');
    await repo.commit('added snapshot to .gitignore', '.gitignore');
  }
  log('Snapshot directory added to gitignore');
};

// const useLocalServer = async server => {
//   separator();
//   log('Custom server found, copying server');
//   await copyServerFile(server);
//   await startServer(server);
//   log('Custom server started....');
// };

const checkoutGitCommit = async (path, commit, repo) => {
  if (commit) {
    const repo = await simpleGit(path);
    const checkout = await repo.checkout(commit);
  }
};

const createLocalServer = async dir => {
  separator();
  log('No custom server found, creating static hosted server');
  const PORT = await server(dir);
  shell.openExternal(`http://localhost:${PORT}`);
  log(`View local deploy here: http://localhost:${PORT}`);
};

const runBuildStep = async (cmd, path) => {
  separator();
  log('Running build process...');
  log({ cmd, path });
  const { stdout, stderr } = await exec(`${cmd} --prefix ${path}`, {
    maxBuffer: 1024 * 8000
  });
  log(('Output:', stdout));
  log('stderr:', stderr);
};

const copyBuildDir = async (output, path, commitId) => {
  separator();
  log('Copying output directory...........!');
  const dir = `${path}/${TEMP_DIR}/${commitId}`;
  await copy(`${path}/${output}`, dir);
  log('Directory copied!');
  return dir;
};

const revertGitCheckout = async (branch, repo) => {
  log(`Reverting back to previous branch: ${branch}`);
  console.log({ repo, branch });
  await repo.checkout(branch);
};

const snapshot = async ({ state, dispatch }) => {
  const { git, project, commitsTable } = state;
  const { repo, currentBranch } = git;

  // TODO: repo.cwd(workingDirectory), sets current working dir of repo.
  const { path, config } = project;
  const { row: { commitId } } = commitsTable;
  const { build, output } = config;
  console.log({ config });

  try {
    await ignoreSnapshot(path);
    // await warnIfUncommittedChanges(commit);
    await checkoutGitCommit(path, commitId, repo);
    await runBuildStep(build, path);
    const directoryToHost = await copyBuildDir(output, path);
    await createLocalServer(directoryToHost);
  } catch (err) {
    log('ERROR', err);
  } finally {
    await revertGitCheckout(currentBranch, repo);
  }
};
export default snapshot;
