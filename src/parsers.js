import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath);

const parsers = (filepath, fileext) => {
  const fpath = getPath(filepath);

  if (fileext === 'json') {
    return JSON.parse(readFile(fpath));
  } if (fileext === 'yaml' || fileext === 'yml') {
    return yaml.load(readFile(fpath));
  }
  return '';
};

export default parsers;
