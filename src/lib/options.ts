import { IOptions } from "../interfaces/options.i"
import * as path from 'path'
import * as fs from 'fs'
import { isNull, isNullOrUndefined } from "util"
import { getRootPath, resolves, getExtensionName } from "./fsHelper"
import { existsSync } from "fs"
import { Command } from "commander"
import { red } from 'colors/safe'
import { CustomConfigFileName} from "./formats"

const gitignoreToGlob = require('gitignore-to-glob');

export function getDefaultOptions(): IOptions {
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
  }
}


/**
 * 获取自定义配置项
 */
export const getCutomOptions = (): object | null => {
  let customConfPath = path.join(getRootPath(), CustomConfigFileName)
  if (fs.existsSync(customConfPath)) {
    let customConf = JSON.parse(fs.readFileSync(customConfPath, 'utf8'))
    return customConf
  }
  return null
}

export function getConfigOption(name: string, options?: IOptions): any {
  return options ? (options as any)[name] || (getDefaultOptions() as any)[name] : (getDefaultOptions() as any)[name];
}

/**
 * 对ignore规范化
 * './ignore/**', '/ignore', 'ignore/'
 * @param options IConfigOptions
 */
export function prepareIgnore(options: IOptions): IOptions {
  let { ignore = [] } = options
  const gitignore = options.gitignore
  ignore = ignore.map(x => {
    if (x.substr(0, 1) === '/') {
      x = '**' + x
    } else if (x.substr(0, 2) === './') {
      x = x.replace('./', '**/')
    }
    else if (x.substr(0, 2) !== '**') {
      x = '**/' + x
    }
    return (x.substr(x.length - 1) === '/' ? `${x}**/*` : x)
  })

  if (gitignore && existsSync(getRootPath() + '/.gitignore')) {
    let gitignorePatterns: string[] = gitignoreToGlob(getRootPath() + '/.gitignore') || [];
    gitignorePatterns = gitignorePatterns.map(
      pattern => (pattern.substr(pattern.length - 1) === '/' ? `${pattern}**/*` : pattern)
    );
    ignore.push(...gitignorePatterns);
    ignore = ignore.map(pattern => pattern.replace('!', ''));
  }
  // 文件后缀名监测 !**/*.js ignore无法识别

  options.ignore = [... new Set(ignore)]
  return options
}
/**
 * 支持 ./src ,/src, src/  以及全路径
 */
export function preparePath(p: string[]): string[] {
  return p.map(x => {
    if (x.substr(0, 1) === '/') {
      x = resolves(x)
    }
    return resolves(path.join(x, '**').replace(/\\/g, '/'))
  })
}

export function prepareOptions(cli: Command = new Command()): IOptions {
  let customConfig = cli.config ? path.resolve(cli.config) : getCutomOptions()
  if (isNull(customConfig)) {
    console.log(red(`no custom configuration ${CustomConfigFileName}, use default config`))
  }
  let config: IOptions = Object.assign({}, getDefaultOptions(), customConfig)
  config.path = preparePath(config.path)
  if (cli.path) {
    config.path = [... new Set(config.path.concat(preparePath(cli.path)))]
  }

  if(cli.output){
    config.output=cli.output
  }
  
  if (!isNullOrUndefined(cli.gitignore)) {
    config.gitignore = cli.gitignore
  }
  return prepareIgnore(config)
}


export function filterFilesByExtensionNameInOptions(files: string[], extensionNames: string[]): string[] {
  return files.filter(x => extensionNames.includes(getExtensionName(x))) || []
}