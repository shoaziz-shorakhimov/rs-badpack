module.exports = [
  {
    id: 0,
    content: `
      const sum = require('./sum.js');
      console.log(sum(1, 2, 3));
    `,
    dependencies: {
      './sum.js': 1,
    },
  },
  {
    id: 1,
    content: `
      const sum = (...numbers) => numbers.reduce((acc, next) => acc + next);
      module.exports = sum
    `,
    dependencies: {},
  },
];
