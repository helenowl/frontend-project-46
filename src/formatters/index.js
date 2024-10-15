import getFormatSt from './stylish.js';
import getFormatPl from './plain.js';
import getFormatJs from './json.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return getFormatSt(diff);
  } if (format === 'plain') {
    return getFormatPl(diff);
  } if (format === 'json') {
    return getFormatJs(diff);
  }
  return new Error(`Unknown type: ${format}`);
};

export default getFormatDiff;
