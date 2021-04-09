"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFilesByExtensionNameInOptions = exports.prepareOptions = exports.preparePath = exports.prepareIgnore = exports.getConfigOption = exports.getCutomOptions = exports.getDefaultOptions = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const utils_1 = require("./utils");
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
    if (utils_1.isNull(customConfig)) {
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
    if (!utils_1.isNullOrUndefined(cli.gitignore)) {
        config.gitignore = cli.gitignore;
    }
    return prepareIgnore(config);
}
exports.prepareOptions = prepareOptions;
function filterFilesByExtensionNameInOptions(files, extensionNames) {
    return files.filter(x => extensionNames.includes(fsHelper_1.getExtensionName(x))) || [];
}
exports.filterFilesByExtensionNameInOptions = filterFilesByExtensionNameInOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQTRCO0FBQzVCLHVDQUF3QjtBQUN4QixtQ0FBbUQ7QUFDbkQseUNBQW9FO0FBQ3BFLDJCQUErQjtBQUMvQix5Q0FBbUM7QUFDbkMsc0NBQWlDO0FBQ2pDLHVDQUErQztBQUUvQyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUVyRCxTQUFnQixpQkFBaUI7SUFDL0IsT0FBTztRQUNMLEdBQUcsRUFBRTtZQUNILElBQUk7WUFDSixLQUFLO1lBQ0wsSUFBSTtZQUNKLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtTQUNQO1FBQ0QsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sRUFBRTtZQUNOLFVBQVU7WUFDVixTQUFTO1lBQ1QsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixTQUFTO1lBQ1QsU0FBUztZQUNULFlBQVk7WUFDWixLQUFLO1lBQ0wsVUFBVTtTQUNYO1FBQ0QsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDcEMsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLFVBQVU7S0FDbkIsQ0FBQTtBQUNILENBQUM7QUExQkQsOENBMEJDO0FBR0Q7O0dBRUc7QUFDVSxRQUFBLGVBQWUsR0FBRyxHQUFrQixFQUFFO0lBQ2pELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQVcsRUFBRSxFQUFFLDhCQUFvQixDQUFDLENBQUE7SUFDbkUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ2pDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FB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