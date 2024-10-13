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
