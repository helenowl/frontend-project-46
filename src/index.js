import _ from 'lodash';
import parsers from './parsers.js';

const readFileExt = (filename) => filename.slice(filename.indexOf('.') + 1).toLowerCase();
const genDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const diff = keys.flatMap((key) => {
    if (data1[key] === data2[key]) {
      return `    ${key}: ${data1[key]}`;
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return keys;
  });

  return ['{', ...diff, '}'].join('\n');
};

const parser = (filepath1, filepath2) => {
  const data1 = parsers(filepath1, readFileExt(filepath1));

  const data2 = parsers(filepath2, readFileExt(filepath2));

  return genDiff(data1, data2);
};

export default parser;
