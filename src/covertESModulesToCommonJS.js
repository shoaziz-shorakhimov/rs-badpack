const acorn = require('acorn');
const walk = require('acorn-walk');

const convertEsModulesToCommonJs = (content) => {
  let convertedContent = content;
  let shift = 0;
  function replaceNode(node, text) {
    const before = convertedContent.slice(0, node.start + shift);
    const after = convertedContent.slice(node.end + shift);
    convertedContent = before + text + after;

    const replacedLengthDiff = text.length - (node.end - node.start);
    shift += replacedLengthDiff;
  }

  const ast = acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
  walk.simple(ast, {
    ImportDeclaration: (node) => {
      const importVariableName = node.specifiers[0].local.name;
      const source = node.source.value;
      replaceNode(node, `const ${importVariableName} = require('${source}');`);
    },
    ExportDefaultDeclaration: (node) => {
      replaceNode(node, `module.exports = ${node.declaration.name};`);
    },
  });

  return convertedContent;
};

module.exports = convertEsModulesToCommonJs;
