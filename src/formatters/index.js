import getFormatSt from './stylish.js';
import getFormatPl from './plain.js';
import getFormatJs from './json.js';

const getFormatDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return getFormatSt(diff);
    case 'plain':
      return getFormatPl(diff);
    case 'json':
      return getFormatJs(diff);
    default: throw new Error(`Unknown type: ${format}`);
  }
};

export default getFormatDiff;
