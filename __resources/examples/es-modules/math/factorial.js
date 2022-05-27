import range from '../range.js';
import logger from '../logger.js';

const factorial = (n) => {
  logger.info(`Calculating factorial for ${n}`);

  const numbersToN = range(n);
  return numbersToN.reduce((result, next) => result * next);
};

export default factorial;
