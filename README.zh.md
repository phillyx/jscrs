## 代码注释率统计

主要用于前端代码注释率统计，同样也支持其他开发语言

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

不建议使用自定义配置

### config

配置文件，该文件必须是`json`格式。配置文件支持的选项与`cli options`相同

- Cli options： `--config`, `-c`
- Type: **path**
- Default: **null**

比如自定义配置文件
```bash
$ jscrs -c /config/jscrs/config.json
```

### Ignore case

是否启用忽略`.gitignore`文件内相关文件和目录的功能

- Cli options: `--gitignore`, `--g`,
- Type: **boolean**
- Default **false**

### Output

  生成`html`和`json`报告的输出路径
 - Cli options: `--output`, `-o`
 - Type: **path**
 - Default: **./report/** 

## config file

强烈建议

请在项目根目录下新建`.cr.config.json`文件，并写入自定义内容

```json
{
  "ext": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "vue",
    "html",
    "md" // md文档算作注释
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

如果不添加该文件，且未在`bash`命令中指定自定义文件位置，使用默认配置项，默认项主要为以下内容

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

支持`console`, `html`, `json`

## API 
 
提供API方便集成

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
