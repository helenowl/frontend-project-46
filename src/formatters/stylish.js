import _ from 'lodash';

const textData = (data, number, indentBase) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indentForKey = indentBase.repeat(number + 1);
  const indentForBracket = indentBase.repeat(number);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indentForKey}${key}: ${textData(value, number + 1, indentBase)}`);

  return ['{', ...lines, `${indentForBracket}}`].join('\n');
};

const getFormatSt = (diff) => {
  const indentBase = '    ';
  const types = {
    added: '+ ', deleted: '- ', notChanged: '  ',
  };

  const iter = (tree, number) => tree.map((node) => {
    const indentForNested = indentBase.repeat(number);
    const indent = indentForNested.slice(2);

    const createLine = (type, key, value) => `${indent}${type}${key}: ${textData(value, number, indentBase)}`;

    switch (node.state) {
      case 'added':
        return createLine(types.added, node.key, node.value);
      case 'deleted':
        return createLine(types.deleted, node.key, node.value);
      case 'notChanged':
        return createLine(types.notChanged, node.key, node.value);
      case 'changed':
        return [`${createLine(types.deleted, node.key, node.value1)}`, `${createLine(types.added, node.key, node.value2)}`].join('\n');
      case 'nested':
        return `${indentForNested}${node.key}: ${['{', ...iter(node.value, number + 1), `${indentForNested}}`].join('\n')}`;
      default: throw new Error(`Type: ${node.state} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default getFormatSt;
