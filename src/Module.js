const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

const convertESModulesToCommonJS = require('./covertESModulesToCommonJS');

class Module {
  #absolutePath = null;
  #ast = null;

  constructor(absolutePath) {
    this.#absolutePath = absolutePath;
    this.id = absolutePath;

    const rawContent = fs.readFileSync(absolutePath, { encoding: 'utf-8' });
    this.content = convertESModulesToCommonJS(rawContent);

    this.#ast = acorn.parse(this.content, { ecmaVersion: 'latest' });
    this.dependencies = this.#findDependencies();
  }

  #findDependencies() {
    const dependencies = {};

    walk.simple(this.#ast, {
      CallExpression: (node) => {
        if (node.callee.name === 'require') {
          const relativePath = node.arguments[0].value;
          dependencies[relativePath] = new Module(path.join(path.dirname(this.#absolutePath), relativePath));
        }
      },
    });

    return dependencies;
  }
}

module.exports = Module;
