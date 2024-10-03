import { readFileSync } from 'fs';
import path from 'path';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath);

const parser = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const data1 = JSON.parse(readFile(path1));

  const path2 = getPath(filepath2);
  const data2 = JSON.parse(readFile(path2));

  return console.log(data1);
};

export default parser;
