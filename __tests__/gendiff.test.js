import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
test('parser output json', () => {
  const expected = readFile('fileOutput.txt');
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const actual = parser(filepath1, filepath2);
  expect(actual).toEqual(expected);
});

test('parser output yaml', () => {
  const expected = readFile('fileOutput.txt');
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const actual = parser(filepath1, filepath2);
  expect(actual).toEqual(expected);
});

test('parser output stylish json', () => {
  const expected = readFile('fileOutputStylish.txt');
  const filepath1 = getFixturePath('rek_file1.json');
  const filepath2 = getFixturePath('rek_file2.json');
  const actual = parser(filepath1, filepath2, 'stylish');
  expect(actual).toEqual(expected);
});

test('parser output plain json', () => {
  const expected = readFile('fileOutputPlain.txt');
  const filepath1 = getFixturePath('rek_file1.json');
  const filepath2 = getFixturePath('rek_file2.json');
  const actual = parser(filepath1, filepath2, 'plain');
  expect(actual).toEqual(expected);
});

test('parser output json json', () => {
  const expected = readFile('fileOutputJson.txt');
  const filepath1 = getFixturePath('rek_file1.json');
  const filepath2 = getFixturePath('rek_file2.json');
  const actual = parser(filepath1, filepath2, 'json');
  expect(actual).toEqual(expected);
});
