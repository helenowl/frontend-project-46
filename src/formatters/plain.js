import _ from 'lodash';

const textData = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  return _.isString(data) ? `'${data}'` : data;
};

const getLineKey = (diffKey, currKey) => {
  if (diffKey === null) {
    return currKey;
  }
  return `${diffKey}.${currKey}`;
};

const getFormatPl = (diff) => {
  const types = {
    added: 'added', deleted: 'removed', changed: 'updated',
  };

  const iter = (tree, diffKey) => tree
    .filter((node) => node.state !== 'notChanged')
    .map((node) => {
      const lineKey = getLineKey(diffKey, node.key);

      const createLine = (type, value) => `Property '${lineKey}' was ${type} with value: ${textData(value)}`;
      const createLineDel = (type) => `Property '${lineKey}' was ${type}`;
      const createLineUpd = (type, value1, value2) => `Property '${lineKey}' was ${type}. From ${textData(value1)} to ${textData(value2)}`;

      switch (node.state) {
        case 'added':
          return createLine(types.added, node.value);
        case 'deleted':
          return createLineDel(types.deleted);
        case 'changed':
          return createLineUpd(types.changed, node.value1, node.value2);
        case 'nested':
          return `${iter(node.value, lineKey).join('\n')}`;
        default: throw new Error(`Type: ${node.state} is undefined`);
      }
    });

  const stylishDiff = iter(diff, null);
  return [...stylishDiff].join('\n');
};

export default getFormatPl;
