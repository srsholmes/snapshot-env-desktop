const chalk = require('chalk');
const {
  readFileSync, copy, exists, copyFile, readFile, appendFile
} = require('fs-extra');
const { promisify } = require('util');
const { createServer } = require('http-server');
const exec = promisify(require('child_process').exec);
const { fork } = require('child_process');

const info = chalk.blue;
const go = chalk.green;
const error = chalk.bold.red;
const { log } = console;
const separator = () => log('*'.repeat(80));
const snapshot = () => {
  console.log('SNAPSHOT');
};
