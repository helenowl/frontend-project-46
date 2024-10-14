import getFormatSt from './stylish.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return getFormatSt(diff);
  }
  return diff;
};

export default getFormatDiff;
