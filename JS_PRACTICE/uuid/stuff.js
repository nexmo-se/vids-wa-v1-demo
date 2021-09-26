const { v4: uuidv4 } = require('uuid');

var numbers = 12345;

const myFunc = (one, two) => {
  return 'myFunc', one + two;
};

module.exports = { uuidv4, numbers, myFunc };
