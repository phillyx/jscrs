import { Command } from "commander";
import analysis from './analysis';
import { prepareOptions } from "./lib/options";
import { IOptions } from "./interfaces/options.i";

const packageJSON = require(__dirname + '/../package.json')

export const cli: Command = new Command(packageJSON.name)
  .version(packageJSON.version)
  .usage('[options] <path ...>')
  .description(packageJSON.description)
cli.option('-c, --config [string]', 'path to config file (Default is .cr.config.json in <path>)');

cli.option('-g, --gitignore', 'ignore all files from .gitignore file');
cli.option('-p, --path [string]', '(Deprecated) Path to repo, use `jscrs <path>`');
cli.option('-o, --output [string]', 'reporters to use (Default is ./report/)');
cli.parse(process.argv);

const options: IOptions = prepareOptions(cli);

const crs: analysis = new analysis(options)
crs.generateReports()