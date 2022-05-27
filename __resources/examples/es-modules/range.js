import logger from './logger.js';

const range = (end) => {
  logger.info(`Calculating range for ${end}`);

  const numbers = [];
  for (let i = 1; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
};

export default range;
