import { prepareOptions, filterFilesByExtensionNameInOptions } from './lib/options'
import { getRegExpsByExtensionName, RegExps } from './lib/RegExps'
import { getExtensionName } from './lib/fsHelper'
import * as path from 'path'
import * as fs from 'fs'
import { IOptions } from './interfaces/options.i'
import { IAnalysis } from './interfaces/analysis.i'
import { IReport } from './interfaces/report.i'
import { sync } from 'fast-glob'
import { isNullOrUndefined } from './lib/utils'
import { registerReporterByName, getRegisteredReporters } from './reporter'
import { relative } from 'path'
import { HTMLLIKE_EXTS, CSSLIKE_EXTS } from './lib/formats'
/**
 * 代码注释率检查入口
 */
export default class analysis implements IAnalysis {
  private _conf: IOptions
  get conf(): IOptions {
    return this._conf
  }
  set conf(value: IOptions) {
    this._conf = value
  }

  private _fileList: string[]
  get fileList(): string[] {
    return this._fileList
  }
  set fileList(value: string[]) {
    this._fileList = value
  }

  private _ext2FileList: Map<string, string[]>
  get ext2FileList(): Map<string, string[]> {
    return this._ext2FileList
  }
  set ext2FileList(value: Map<string, string[]>) {
    this._ext2FileList = value
  }

  private _rateReport: Map<string, IReport>
  get rateReport(): Map<string, IReport> {
    return this._rateReport
  }
  set rateReport(value: Map<string, IReport>) {
    this._rateReport = value
  }

  constructor(options?: IOptions) {
    this._conf = isNullOrUndefined(options) ? prepareOptions() : options as IOptions
    this._fileList = this.getFiles()
    this._ext2FileList = this.getExt2FileList()
    this._rateReport = new Map()
    this.initializeReporters()
    // console.log(this.ext2FileList)
  }
  private getExt2FileList(): Map<string, string[]> {
    let ext2FileList: Map<string, string[]> = new Map()
    this.conf.ext.forEach(x => {
      ext2FileList.set(
        x,
        this.fileList.filter(y => path.extname(y).substr(1) === x)
      )
    })
    return ext2FileList
  }
  private getFiles(): string[] {
    const { path, ignore, ext } = this._conf
    let fileList = sync(path, {
      ignore,
      onlyFiles: true,
      dot: false,
      stats: false,
      absolute: true,
    })
    return filterFilesByExtensionNameInOptions(fileList, ext)
  }
  /**
   * 统计代码注释率
   */
  public async statisticCommentRate() {
    try {
      let i = 0
      while (i < this.fileList.length) {
        let filePath = this._fileList[i]
        let rateReport = await this.statisticSingleFileCommentLength(filePath)
        this._rateReport.set(filePath, rateReport)
        i++
      }
      this._rateReport.set('sum', this.statisticSumRate())
      return this.rateReport
    } catch (error) {
      throw error
    }
  }
  /**
   * 统计单个文件的注释长度
   * @param regs 文件扩展名所对应的正则表达式列表
   * @param filePath 文件路径
   */
  private statisticSingleFileCommentLength(filePath: string): Promise<IReport> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, fdata) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        let fileLength: number = fdata.length
        let singleFileCommentLength: number = 0
        const extname: string = getExtensionName(filePath)

        // html-likes 文件单独处理
        if (HTMLLIKE_EXTS.includes(extname)) {
          let tmpObj = this.statisticHtmlLikeStream(fdata, extname)
          fileLength = tmpObj.fileLength
          singleFileCommentLength = tmpObj.commentLength
        } else if (extname === 'md') {
          // md文档算作注释
          singleFileCommentLength = fileLength
        } else {
          const regs: RegExp[] = getRegExpsByExtensionName(extname)
          singleFileCommentLength = this.calculateCommentLength(regs, fdata)
        }

        const commentRate = ((singleFileCommentLength / (fileLength === 0 ? 1 : fileLength)) * 100).toFixed(1)

        let logstr: IReport = {
          extname: extname,
          filePath: relative(process.cwd(), filePath),
          length: fileLength,
          commentLength: singleFileCommentLength,
          commentRate: `${commentRate}%`,
        }
        // console.table([
        //   logstr
        // ])
        resolve(logstr)
      })
    })
  }
  /**
   * 如果ext配置项内存在 *css，则不过滤
   */
  private kickOutStyleStreamIfNoCSSLikeExtensionNames(fileExtName: string, fileData: string): string {
    if (HTMLLIKE_EXTS.includes(fileExtName) && !this.checkIfCssLikeExtInOptions()) {
      return fileData.replace(RegExps.style, '')
    }
    return fileData
  }
  /**
   * 检查配置项内有无css相关检查要求
   */
  private checkIfCssLikeExtInOptions() {
    return CSSLIKE_EXTS.filter(x => this._conf.ext.includes(x)).length > 0
  }
  private calculateCommentLength(regs: RegExp[], fileStream: string) {
    return regs.reduce((pre, cur) => {
      const m = fileStream.match(cur) || []
      return pre + this.calculateCommentLengthByMatchArr(m)
    }, 0)
  }

  /**
   * 统计单个正则匹配的注释字符串长度
   * @param match 正则匹配字符串得到的结果
   */
  private calculateCommentLengthByMatchArr(match: RegExpMatchArray): number {
    return match.reduce((p, c) => p + c.length, 0)
  }
  private statisticHtmlLikeStream(fileStream: string, extname: string) {
    const str = this.kickOutStyleStreamIfNoCSSLikeExtensionNames(extname, fileStream)
    let commentLength = 0
    const fileLength = str.length

    // 单独统计template模板内的标签文本注释
    commentLength += this.calculateCommentLength([RegExps.markup], str)

    // 单独解析script标签内的js代码注释
    const scriptMatch = str.match(RegExps.script) || []
    scriptMatch.forEach(x => {
      commentLength += this.calculateCommentLength([RegExps.singleLine, RegExps.multiLine], x)
    })

    // 单独统计style标签内的样式代码注释
    if (this.checkIfCssLikeExtInOptions()) {
      ;(str.match(RegExps.style) || []).forEach(x => {
        commentLength += this.calculateCommentLength([RegExps.singleLine, RegExps.multiLine], x)
      })
    }

    return { fileLength, commentLength }
  }

  private statisticSumRate() {
    let report = [...this._rateReport.values()]
    let sumLength = report.reduce((pre, cur) => pre + cur.length, 0)
    let sumCommentLength = report.reduce((pre, cur) => pre + cur.commentLength, 0)
    let sumReport: IReport = {
      extname: 'SUM',
      length: sumLength,
      commentLength: sumCommentLength,
      commentRate: `${((sumCommentLength / sumLength) * 100).toFixed(1)}%`,
    }
    return sumReport
  }
  public async generateReports() {
    const rateReport = await this.statisticCommentRate()

    Object.values(getRegisteredReporters()).map(reporter => {
      reporter.report(rateReport)
    })
    return rateReport
  }

  private initializeReporters() {
    registerReporterByName(this._conf)
  }
}
