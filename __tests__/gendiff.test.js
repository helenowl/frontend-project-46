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
    a: getFixturePath('file1.json'), b: getFixturePath('file2.json'), expected: readFile('fileOutput.txt'),
  },
  {
    a: getFixturePath('file1.yaml'), b: getFixturePath('file2.yaml'), expected: readFile('fileOutput.txt'),
  },
  {
    a: getFixturePath('rek_file1.json'), b: getFixturePath('rek_file2.json'), c: 'stylish', expected: readFile('fileOutputStylish.txt'),
  },
  {
    a: getFixturePath('rek_file1.json'), b: getFixturePath('rek_file2.json'), c: 'plain', expected: readFile('fileOutputPlain.txt'),
  },
  {
    a: getFixturePath('rek_file1.json'), b: getFixturePath('rek_file2.json'), c: 'json', expected: readFile('fileOutputJson.txt'),
  },
])('.add($a, $b, $c)', ({
  a, b, c, expected,
}) => {
  const actual = parser(a, b, c);
  expect(actual).toBe(expected);
});
