const path = require('path');
const Bundler = require('../src');

const TARGET_EXAMPLE = 'cjs';

const bundler = new Bundler({
  input: path.resolve(__dirname, `examples/${TARGET_EXAMPLE}/index.js`),
  output: path.resolve(__dirname, `bundles/${TARGET_EXAMPLE}.bundle.js`),
});

bundler.build();
