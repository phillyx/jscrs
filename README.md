## Code comment rate statistics

中文版请移步[README.zh-cn.md](https://github.com/phillyx/jscrs/blob/master/README.zh.md)

Mainly used for front-end code comment rate statistics, and also supports other development languages

### Installation

```bash
$ npm install jscrs -g
```

### Usage

```bash
$ npx jscrs
```

or 

```bash
$ jscrs
```
## options

Custom configuration is not recommended

### config

Configuration file, the file must be in `json` format. The configuration file supports the same options as `cli options`

- Cli options： `--config`, `-c`
- Type: **path**
- Default: **null**

For example, custom configuration file

```bash
$ jscrs -c /config/jscrs/config.json
```

### Ignore case

Whether to enable the ability of ignoring related files and directories in the `.gitignore` file

- Cli options: `--gitignore`, `--g`,
- Type: **boolean**
- Default **false**

### Output

Output path for generating `html` and` json` reports

 - Cli options: `--output`, `-o`
 - Type: **path**
 - Default: **./report/** 

## config file

strongly recommended

Please create a new `.cr.config.json` file in the root directory of the project and write custom configuration

```json
{
  "ext": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "vue",
    "html",
    "md" // bingo, md file is recognized as comment
  ],
  "path": [
    "/src"
  ],
  "ignore":[
    "/dist/**",
    "dest/**",
    "./node_modules/**",
    "test/**",
    "data/**",
    "src/doc/**",
    "doc",
    "entries/",
  ]
}
```

If the file is not added, and the custom configuration file location is not specified in the `bash` command, the default configuration items are used, and the default items are mainly the following

```js
{
    ext: [
      'ts',
      'tsx',
      'js',
      'jsx',
      'vue',
      'html',
      'css',
      'less',
      'scss'
    ],
    path: [process.cwd()],
    ignore: [
      '/dist/**',
      'dest/**',
      './node_modules/**',
      'test/**',
      'data/**',
      'src/doc/**',
      'doc',
      'entries/'
    ],
    reports: ['console', 'html', 'json'],
    gitignore: false,  // 默认不启用该功能
    output: './report' // 默认输出目录
  }
```

## JSCRS Reporters

support `console`, `html`, `json`

## API 
 
Provide API for easy integration

```ts
import {
  IOptions,
  IAnalysis,
  IReport,
  analysis
} from 'jscrs';

const options: IOptions = {};

const ana: IAnalysis = new analysis(options);

/**@return IReport*/
const report: IReport = ana.statisticCommentRate();

/**IReport to log*/
ana.generateReports();
```