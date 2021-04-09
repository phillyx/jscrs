import { IOptions } from './interfaces/options.i';
import { IAnalysis } from './interfaces/analysis.i';
import { IReport } from './interfaces/report.i';
/**
 * 代码注释率检查入口
 */
export default class analysis implements IAnalysis {
    private _conf;
    get conf(): IOptions;
    set conf(value: IOptions);
    private _fileList;
    get fileList(): string[];
    set fileList(value: string[]);
    private _ext2FileList;
    get ext2FileList(): Map<string, string[]>;
    set ext2FileList(value: Map<string, string[]>);
    private _rateReport;
    get rateReport(): Map<string, IReport>;
    set rateReport(value: Map<string, IReport>);
    constructor(options?: IOptions);
    private getExt2FileList;
    private getFiles;
    /**
     * 统计代码注释率
     */
    statisticCommentRate(): Promise<Map<string, IReport>>;
    /**
     * 统计单个文件的注释长度
     * @param regs 文件扩展名所对应的正则表达式列表
     * @param filePath 文件路径
     */
    private statisticSingleFileCommentLength;
    /**
     * 如果ext配置项内存在 *css，则不过滤
     */
    private kickOutStyleStreamIfNoCSSLikeExtensionNames;
    /**
     * 检查配置项内有无css相关检查要求
     */
    private checkIfCssLikeExtInOptions;
    private calculateCommentLength;
    /**
     * 统计单个正则匹配的注释字符串长度
     * @param match 正则匹配字符串得到的结果
     */
    private calculateCommentLengthByMatchArr;
    private statisticHtmlLikeStream;
    private statisticSumRate;
    generateReports(): Promise<Map<string, IReport>>;
    private initializeReporters;
}
