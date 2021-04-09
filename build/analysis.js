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
const options_1 = require("./lib/options");
const RegExps_1 = require("./lib/RegExps");
const fsHelper_1 = require("./lib/fsHelper");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const fast_glob_1 = require("fast-glob");
const utils_1 = require("./lib/utils");
const reporter_1 = require("./reporter");
const path_1 = require("path");
const formats_1 = require("./lib/formats");
/**
 * 代码注释率检查入口
 */
class analysis {
    constructor(options) {
        this._conf = utils_1.isNullOrUndefined(options) ? options_1.prepareOptions() : options;
        this._fileList = this.getFiles();
        this._ext2FileList = this.getExt2FileList();
        this._rateReport = new Map();
        this.initializeReporters();
        // console.log(this.ext2FileList)
    }
    get conf() {
        return this._conf;
    }
    set conf(value) {
        this._conf = value;
    }
    get fileList() {
        return this._fileList;
    }
    set fileList(value) {
        this._fileList = value;
    }
    get ext2FileList() {
        return this._ext2FileList;
    }
    set ext2FileList(value) {
        this._ext2FileList = value;
    }
    get rateReport() {
        return this._rateReport;
    }
    set rateReport(value) {
        this._rateReport = value;
    }
    getExt2FileList() {
        let ext2FileList = new Map();
        this.conf.ext.forEach(x => {
            ext2FileList.set(x, this.fileList.filter(y => path.extname(y).substr(1) === x));
        });
        return ext2FileList;
    }
    getFiles() {
        const { path, ignore, ext } = this._conf;
        let fileList = fast_glob_1.sync(path, {
            ignore,
            onlyFiles: true,
            dot: false,
            stats: false,
            absolute: true,
        });
        return options_1.filterFilesByExtensionNameInOptions(fileList, ext);
    }
    /**
     * 统计代码注释率
     */
    async statisticCommentRate() {
        try {
            let i = 0;
            while (i < this.fileList.length) {
                let filePath = this._fileList[i];
                let rateReport = await this.statisticSingleFileCommentLength(filePath);
                this._rateReport.set(filePath, rateReport);
                i++;
            }
            this._rateReport.set('sum', this.statisticSumRate());
            return this.rateReport;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * 统计单个文件的注释长度
     * @param regs 文件扩展名所对应的正则表达式列表
     * @param filePath 文件路径
     */
    statisticSingleFileCommentLength(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, { encoding: 'utf-8' }, (err, fdata) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                let fileLength = fdata.length;
                let singleFileCommentLength = 0;
                const extname = fsHelper_1.getExtensionName(filePath);
                // html-likes 文件单独处理
                if (formats_1.HTMLLIKE_EXTS.includes(extname)) {
                    let tmpObj = this.statisticHtmlLikeStream(fdata, extname);
                    fileLength = tmpObj.fileLength;
                    singleFileCommentLength = tmpObj.commentLength;
                }
                else if (extname === 'md') {
                    // md文档算作注释
                    singleFileCommentLength = fileLength;
                }
                else {
                    const regs = RegExps_1.getRegExpsByExtensionName(extname);
                    singleFileCommentLength = this.calculateCommentLength(regs, fdata);
                }
                const commentRate = ((singleFileCommentLength / (fileLength === 0 ? 1 : fileLength)) * 100).toFixed(1);
                let logstr = {
                    extname: extname,
                    filePath: path_1.relative(process.cwd(), filePath),
                    length: fileLength,
                    commentLength: singleFileCommentLength,
                    commentRate: `${commentRate}%`,
                };
                // console.table([
                //   logstr
                // ])
                resolve(logstr);
            });
        });
    }
    /**
     * 如果ext配置项内存在 *css，则不过滤
     */
    kickOutStyleStreamIfNoCSSLikeExtensionNames(fileExtName, fileData) {
        if (formats_1.HTMLLIKE_EXTS.includes(fileExtName) && !this.checkIfCssLikeExtInOptions()) {
            return fileData.replace(RegExps_1.RegExps.style, '');
        }
        return fileData;
    }
    /**
     * 检查配置项内有无css相关检查要求
     */
    checkIfCssLikeExtInOptions() {
        return formats_1.CSSLIKE_EXTS.filter(x => this._conf.ext.includes(x)).length > 0;
    }
    calculateCommentLength(regs, fileStream) {
        return regs.reduce((pre, cur) => {
            const m = fileStream.match(cur) || [];
            return pre + this.calculateCommentLengthByMatchArr(m);
        }, 0);
    }
    /**
     * 统计单个正则匹配的注释字符串长度
     * @param match 正则匹配字符串得到的结果
     */
    calculateCommentLengthByMatchArr(match) {
        return match.reduce((p, c) => p + c.length, 0);
    }
    statisticHtmlLikeStream(fileStream, extname) {
        const str = this.kickOutStyleStreamIfNoCSSLikeExtensionNames(extname, fileStream);
        let commentLength = 0;
        const fileLength = str.length;
        // 单独统计template模板内的标签文本注释
        commentLength += this.calculateCommentLength([RegExps_1.RegExps.markup], str);
        // 单独解析script标签内的js代码注释
        const scriptMatch = str.match(RegExps_1.RegExps.script) || [];
        scriptMatch.forEach(x => {
            commentLength += this.calculateCommentLength([RegExps_1.RegExps.singleLine, RegExps_1.RegExps.multiLine], x);
        });
        // 单独统计style标签内的样式代码注释
        if (this.checkIfCssLikeExtInOptions()) {
            ;
            (str.match(RegExps_1.RegExps.style) || []).forEach(x => {
                commentLength += this.calculateCommentLength([RegExps_1.RegExps.singleLine, RegExps_1.RegExps.multiLine], x);
            });
        }
        return { fileLength, commentLength };
    }
    statisticSumRate() {
        let report = [...this._rateReport.values()];
        let sumLength = report.reduce((pre, cur) => pre + cur.length, 0);
        let sumCommentLength = report.reduce((pre, cur) => pre + cur.commentLength, 0);
        let sumReport = {
            extname: 'SUM',
            length: sumLength,
            commentLength: sumCommentLength,
            commentRate: `${((sumCommentLength / sumLength) * 100).toFixed(1)}%`,
        };
        return sumReport;
    }
    async generateReports() {
        const rateReport = await this.statisticCommentRate();
        Object.values(reporter_1.getRegisteredReporters()).map(reporter => {
            reporter.report(rateReport);
        });
        return rateReport;
    }
    initializeReporters() {
        reporter_1.registerReporterByName(this._conf);
    }
}
exports.default = analysis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYW5hbHlzaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1GO0FBQ25GLDJDQUFrRTtBQUNsRSw2Q0FBaUQ7QUFDakQsMkNBQTRCO0FBQzVCLHVDQUF3QjtBQUl4Qix5Q0FBZ0M7QUFDaEMsdUNBQStDO0FBQy9DLHlDQUEyRTtBQUMzRSwrQkFBK0I7QUFDL0IsMkNBQTJEO0FBQzNEOztHQUVHO0FBQ0gsTUFBcUIsUUFBUTtJQWlDM0IsWUFBWSxPQUFrQjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQW1CLENBQUE7UUFDaEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQzFCLGlDQUFpQztJQUNuQyxDQUFDO0lBdENELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBZTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNwQixDQUFDO0lBR0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFlO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO0lBQ3hCLENBQUM7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxh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