#!/usr/bin/env node
import { Command } from 'commander';
import parser from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(parser(filepath1, filepath2));
  });

program.parse();
