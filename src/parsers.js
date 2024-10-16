import yaml from 'js-yaml';

const getParsers = (filepath, fileext) => {
  switch (fileext) {
    case 'json':
      return JSON.parse(filepath);
    case 'yaml':
      return yaml.load(filepath);
    case 'yml':
      return yaml.load(filepath);
    default: throw new Error(`Unknown type: ${fileext}`);
  }
};

export default getParsers;
