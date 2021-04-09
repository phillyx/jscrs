"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const commander_1 = require("commander");
const analysis_1 = __importDefault(require("./analysis"));
const options_1 = require("./lib/options");
const packageJSON = require(__dirname + '/../package.json');
exports.cli = new commander_1.Command(packageJSON.name)
    .version(packageJSON.version)
    .usage('[options] <path ...>')
    .description(packageJSON.description);
exports.cli.option('-c, --config [string]', 'path to config file (Default is .cr.config.json in <path>)');
exports.cli.option('-g, --gitignore', 'ignore all files from .gitignore file');
exports.cli.option('-p, --path [string]', '(Deprecated) Path to repo, use `jscrs <path>`');
exports.cli.option('-o, --output [string]', 'reporters to use (Default is ./report/)');
exports.cli.parse(process.argv);
const options = options_1.prepareOptions(exports.cli);
const crs = new analysis_1.default(options);
crs.generateReports();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMERBQWtDO0FBQ2xDLDJDQUErQztBQUcvQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDLENBQUE7QUFFOUMsUUFBQSxHQUFHLEdBQVksSUFBSSxtQkFBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7S0FDdEQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7S0FDNUIsS0FBSyxDQUFDLHNCQUFzQixDQUFDO0tBQzdCLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDdkMsV0FBRyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSw0REFBNEQsQ0FBQyxDQUFDO0FBRWxHLFdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsdUNBQXVDLENBQUMsQ0FBQztBQUN2RSxXQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLCtDQUErQyxDQUFDLENBQUM7QUFDbkYsV0FBRyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO0FBQy9FLFdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXhCLE1BQU0sT0FBTyxHQUFhLHdCQUFjLENBQUMsV0FBRyxDQUFDLENBQUM7QUFFOUMsTUFBTSxHQUFHLEdBQWEsSUFBSSxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzNDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQSJ9