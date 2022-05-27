const fs = require('fs');
const path = require('path');
const uniqBy = require('lodash/fp/uniqBy');
const mapValues = require('lodash/fp/mapValues');

const Module = require('./Module');

class Bundler {
  #input = null;
  #output = null;

  constructor({ input, output }) {
    this.#input = input;
    this.#output = output;
  }

  build() {
    const entry = new Module(this.#input);
    const modules = this.#collectModules(entry);
    const bundle = this.#evaluateBundle(entry.id, modules);
    this.#printBundle(bundle);
  }

  #collectModules(entry) {
    const modules = [entry];
    for (const module of modules) {
      modules.push(...Object.values(module.dependencies));
    }

    return uniqBy('id', modules);
  }

  #evaluateBundle(entryId, modules) {
    return `
      (function() {
        const modules = new Map();
        ${modules
          .map(({ id, content, dependencies }) => {
            return `
            modules.set(${JSON.stringify(id)}, function() {
              const module = { exports: {} };
              
              function require(relativePath) {
                const dependencies = ${JSON.stringify(mapValues('id', dependencies))};
                const requiredModuleId = dependencies[relativePath];
                return loadModule(requiredModuleId);
              }
              
              ${content}
              
              return module.exports;
            })
          `;
          })
          .join('\n')}
        
        const loadedModules = new Map();
        function loadModule(id) {
          if (loadedModules.has(id)) {
            return loadedModules.get(id);
          }
          
          const moduleLoader = modules.get(id);
          const module = moduleLoader();
          loadedModules.set(id, module);
          return module
        }
        
        loadModule(${JSON.stringify(entryId)});
      })()
    `;
  }

  #printBundle(bundle) {
    this.#ensureBundleDirectoryExists();
    fs.writeFileSync(this.#output, bundle);
  }

  #ensureBundleDirectoryExists() {
    const dirname = path.dirname(this.#output);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
  }
}

module.exports = Bundler;
