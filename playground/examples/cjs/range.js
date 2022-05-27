const logger = require('./logger.js');

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
