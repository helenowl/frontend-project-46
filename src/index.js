import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath);

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
  const path1 = getPath(filepath1);
  const data1 = JSON.parse(readFile(path1));

  const path2 = getPath(filepath2);
  const data2 = JSON.parse(readFile(path2));

  const diff = genDiff(data1, data2);

  return diff;
};

export default parser;
