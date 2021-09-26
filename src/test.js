var utils;
try {
  utils = require('./utils');
} catch (err) {
  console.log('utils moved');
  utils = require('../../utils');
}

console.log(utils);
