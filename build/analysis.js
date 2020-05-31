"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
	if (mod && mod.__esModule) return mod;
	var result = {};
	if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	result["default"] = mod;
	return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./lib/options");
const RegExps_1 = require("./lib/RegExps");
const fsHelper_1 = require("./lib/fsHelper");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const fast_glob_1 = require("fast-glob");
const util_1 = require("util");
const reporter_1 = require("./reporter");
const path_1 = require("path");
const formats_1 = require("./lib/formats");
/**
 * 代码注释率检查入口
 */
class analysis {
	constructor(options) {
		this._conf = util_1.isNullOrUndefined(options) ? options_1.prepareOptions() : options;
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
			absolute: true
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
				else if (extname === 'md') { // md文档算作注释
					singleFileCommentLength = fileLength;
				}
				else {
					const regs = RegExps_1.getRegExpsByExtensionName(extname);
					singleFileCommentLength = this.calculateCommentLength(regs, fdata);
				}
				const commentRate = (singleFileCommentLength / (fileLength === 0 ? 1 : fileLength) * 100).toFixed(1);
				let logstr = {
					'extname': extname,
					'filePath': (path_1.relative(process.cwd(), filePath)),
					'length': fileLength,
					'commentLength': singleFileCommentLength,
					'commentRate': `${commentRate}%`
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
			commentRate: `${(sumCommentLength / sumLength * 100).toFixed(1)}%`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYW5hbHlzaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkNBQW9GO0FBQ3BGLDJDQUFtRTtBQUNuRSw2Q0FBa0Q7QUFDbEQsMkNBQTZCO0FBQzdCLHVDQUF5QjtBQUl6Qix5Q0FBaUM7QUFDakMsK0JBQXlDO0FBQ3pDLHlDQUE0RTtBQUM1RSwrQkFBZ0M7QUFDaEMsMkNBQTREO0FBQzVEOztHQUVHO0FBQ0gsTUFBcUIsUUFBUTtJQWlDM0IsWUFBWSxPQUFrQjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtRQUNwRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDMUIsaUNBQWlDO0lBQ25DLENBQUM7SUF0Q0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFlO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDdkIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWU7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7SUFDeEIsQ0FBQztJQUdELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQTtJQUMz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