import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
test.each([
  {
    file1: 'file1.json', file2: 'file2.json', expected: 'fileOutput.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', expected: 'fileOutput.txt',
  },
  {
    file1: 'rek_file1.json', file2: 'rek_file2.json', type: 'stylish', expected: 'fileOutputStylish.txt',
  },
  {
    file1: 'rek_file1.json', file2: 'rek_file2.json', type: 'plain', expected: 'fileOutputPlain.txt',
  },
  {
    file1: 'rek_file1.json', file2: 'rek_file2.json', type: 'json', expected: 'fileOutputJson.txt',
  },
])('.add($a, $b, $c)', ({
  file1, file2, type, expected,
}) => {
  const actual = parser(getFixturePath(file1), getFixturePath(file2), type);
  expect(actual).toBe(readFile(expected));
});
