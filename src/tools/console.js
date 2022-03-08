
const chalk = require('chalk');

const errNormal = chalk.rgb(255,23,23);
const errPriority = chalk.rgb(255,23,23).inverse;
const infoNormal = chalk.rgb(0,157,255);
const infoPriority = chalk.rgb(0,157,255).inverse;
const logNormal = chalk.rgb(64,255,0);
const logPriority = chalk.rgb(64,255,0).inverse;
const warnNormal = chalk.rgb(255,230,0);
const warnPriority = chalk.rgb(255,230,0).inverse;

const log = (text, priority = false) => {
  console.log(priority ? logPriority(text) : logNormal(text));
};

const warn = (text, priority = false) => {
  console.log(priority ? warnPriority(text) : warnNormal(text));
};

const info = (text, priority = false) => {
  console.log(priority ? infoPriority(text) : infoNormal(text));
};

const err = (text, priority = false) => {
  console.log(priority ? errPriority(text) : errNormal(text));
};

exports.log = log;
exports.warn = warn;
exports.info = info;
exports.err = err;

