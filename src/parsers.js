import yaml from 'js-yaml';

const getParsers = (filepath, fileext) => {
  switch (fileext) {
    case 'json':
      return JSON.parse(filepath);
    case ('yaml' || 'yml'):
      return yaml.load(filepath);
    default: throw new Error(`Unknown type: ${fileext}`);
  }
};

export default getParsers;
