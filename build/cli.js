"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFvQztBQUNwQywwREFBa0M7QUFDbEMsMkNBQStDO0FBRy9DLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUMsQ0FBQTtBQUU5QyxRQUFBLEdBQUcsR0FBWSxJQUFJLG1CQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztLQUN0RCxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztLQUM1QixLQUFLLENBQUMsc0JBQXNCLENBQUM7S0FDN0IsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUN2QyxXQUFHLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLDREQUE0RCxDQUFDLENBQUM7QUFFbEcsV0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO0FBQ3ZFLFdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsK0NBQStDLENBQUMsQ0FBQztBQUNuRixXQUFHLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLHlDQUF5QyxDQUFDLENBQUM7QUFDL0UsV0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFeEIsTUFBTSxPQUFPLEdBQWEsd0JBQWMsQ0FBQyxXQUFHLENBQUMsQ0FBQztBQUU5QyxNQUFNLEdBQUcsR0FBYSxJQUFJLGtCQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDM0MsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFBIn0=