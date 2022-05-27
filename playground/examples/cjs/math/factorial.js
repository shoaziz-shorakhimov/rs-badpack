const range = require('../range.js');
const logger = require('../logger.js');

logger.info('Loaded `factorial` module');

const factorial = (n) => {
  logger.info(`Calculating factorial for ${n}`);

  const numbersToN = range(n);
  return numbersToN.reduce((result, next) => result * next);
};

module.exports = factorial;
