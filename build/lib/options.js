"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const util_1 = require("util");
const fsHelper_1 = require("./fsHelper");
const fs_1 = require("fs");
const commander_1 = require("commander");
const safe_1 = require("colors/safe");
const formats_1 = require("./formats");
const gitignoreToGlob = require('gitignore-to-glob');
function getDefaultOptions() {
    return {
        ext: [
            'ts',
            'tsx',
            'js',
            'jsx',
            'vue',
            'html',
        ],
        path: [process.cwd()],
        ignore: [
            '/dist/**',
            'dest/**',
            'neurons/**',
            './node_modules/**',
            'test/**',
            'data/**',
            'src/doc/**',
            'doc',
            'entries/'
        ],
        reports: ['console', 'html', 'json'],
        gitignore: false,
        output: './report',
    };
}
exports.getDefaultOptions = getDefaultOptions;
/**
 * 获取自定义配置项
 */
exports.getCutomOptions = () => {
    let customConfPath = path.join(fsHelper_1.getRootPath(), formats_1.CustomConfigFileName);
    if (fs.existsSync(customConfPath)) {
        let customConf = JSON.parse(fs.readFileSync(customConfPath, 'utf8'));
        return customConf;
    }
    return null;
};
function getConfigOption(name, options) {
    return options ? options[name] || getDefaultOptions()[name] : getDefaultOptions()[name];
}
exports.getConfigOption = getConfigOption;
/**
 * 对ignore规范化
 * './ignore/**', '/ignore', 'ignore/'
 * @param options IConfigOptions
 */
function prepareIgnore(options) {
    let { ignore = [] } = options;
    const gitignore = options.gitignore;
    ignore = ignore.map(x => {
        if (x.substr(0, 1) === '/') {
            x = '**' + x;
        }
        else if (x.substr(0, 2) === './') {
            x = x.replace('./', '**/');
        }
        else if (x.substr(0, 2) !== '**') {
            x = '**/' + x;
        }
        return (x.substr(x.length - 1) === '/' ? `${x}**/*` : x);
    });
    if (gitignore && fs_1.existsSync(fsHelper_1.getRootPath() + '/.gitignore')) {
        let gitignorePatterns = gitignoreToGlob(fsHelper_1.getRootPath() + '/.gitignore') || [];
        gitignorePatterns = gitignorePatterns.map(pattern => (pattern.substr(pattern.length - 1) === '/' ? `${pattern}**/*` : pattern));
        ignore.push(...gitignorePatterns);
        ignore = ignore.map(pattern => pattern.replace('!', ''));
    }
    // 文件后缀名监测 !**/*.js ignore无法识别
    options.ignore = [...new Set(ignore)];
    return options;
}
exports.prepareIgnore = prepareIgnore;
/**
 * 支持 ./src ,/src, src/  以及全路径
 */
function preparePath(p) {
    return p.map(x => {
        if (x.substr(0, 1) === '/') {
            x = fsHelper_1.resolves(x);
        }
        return fsHelper_1.resolves(path.join(x, '**').replace(/\\/g, '/'));
    });
}
exports.preparePath = preparePath;
function prepareOptions(cli = new commander_1.Command()) {
    let customConfig = cli.config ? path.resolve(cli.config) : exports.getCutomOptions();
    if (util_1.isNull(customConfig)) {
        console.log(safe_1.red(`no custom configuration ${formats_1.CustomConfigFileName}, use default config`));
    }
    let config = Object.assign({}, getDefaultOptions(), customConfig);
    config.path = preparePath(config.path);
    if (cli.path) {
        config.path = [...new Set(config.path.concat(preparePath(cli.path)))];
    }
    if (cli.output) {
        config.output = cli.output;
    }
    if (!util_1.isNullOrUndefined(cli.gitignore)) {
        config.gitignore = cli.gitignore;
    }
    return prepareIgnore(config);
}
exports.prepareOptions = prepareOptions;
function filterFilesByExtensionNameInOptions(files, extensionNames) {
    return files.filter(x => extensionNames.includes(fsHelper_1.getExtensionName(x))) || [];
}
exports.filterFilesByExtensionNameInOptions = filterFilesByExtensionNameInOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSwyQ0FBNEI7QUFDNUIsdUNBQXdCO0FBQ3hCLCtCQUFnRDtBQUNoRCx5Q0FBb0U7QUFDcEUsMkJBQStCO0FBQy9CLHlDQUFtQztBQUNuQyxzQ0FBaUM7QUFDakMsdUNBQStDO0FBRS9DLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXJELFNBQWdCLGlCQUFpQjtJQUMvQixPQUFPO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsSUFBSTtZQUNKLEtBQUs7WUFDTCxJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1NBQ1A7UUFDRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckIsTUFBTSxFQUFFO1lBQ04sVUFBVTtZQUNWLFNBQVM7WUFDVCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLFNBQVM7WUFDVCxTQUFTO1lBQ1QsWUFBWTtZQUNaLEtBQUs7WUFDTCxVQUFVO1NBQ1g7UUFDRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNwQyxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsVUFBVTtLQUNuQixDQUFBO0FBQ0gsQ0FBQztBQTFCRCw4Q0EwQkM7QUFHRDs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFHLEdBQWtCLEVBQUU7SUFDakQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBVyxFQUFFLEVBQUUsOEJBQW9CLENBQUMsQ0FBQTtJQUNuRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDakMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxN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