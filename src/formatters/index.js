import getFormatSt from './stylish.js';
import getFormatPl from './plain.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return getFormatSt(diff);
  } if (format === 'plain') {
    return getFormatPl(diff);
  }
  return diff;
};

export default getFormatDiff;
