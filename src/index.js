import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import getParsers from './parsers.js';
import getFormatDiff from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath);

const readFileExt = (filename) => filename.slice(filename.indexOf('.') + 1).toLowerCase();
const genDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const diff = keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, state: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, state: 'deleted', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, state: 'nested', value: genDiff(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, state: 'changed', value1: data1[key], value2: data2[key],
      };
    }

    return { key, state: 'notChanged', value: data1[key] };
  });
  return diff;
};

const parser = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getParsers(readFile(getPath(filepath1)), readFileExt(filepath1));

  const data2 = getParsers(readFile(getPath(filepath2)), readFileExt(filepath2));

  const diff = genDiff(data1, data2);

  return getFormatDiff(diff, format);
};

export default parser;
