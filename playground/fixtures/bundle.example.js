// logger.js

const logger = {
  info(text) {
    console.log('INFO: ' + text);
  },
};

module.exports = logger;

// range.js
const logger = require('../examples/cjs/logger.js');

logger.info('Loaded `range` module');

const range = (end) => {
  logger.info(`Calculating range for ${end}`);

  const numbers = [];
  for (let i = 1; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
};

module.exports = range;

// math/factorial.js

const range = require('../range.js');
const logger = require('../logger.js');

logger.info('Loaded `factorial` module');

const factorial = (n) => {
  logger.info(`Calculating factorial for ${n}`);

  const numbersToN = range(n);
  return numbersToN.reduce((result, next) => result * next);
};

module.exports = factorial;

// index.js

const factorial = require('../examples/cjs/math/factorial.js');
const logger = require('../examples/cjs/logger.js');

logger.info(`Factorial of 10 is ${factorial(10)}`);
