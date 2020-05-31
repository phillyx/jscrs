import { IReport } from "../interfaces/report.i";
import { ILogReporter } from "../interfaces/log.i";
import { IOptions } from "../interfaces/options.i";
export declare class HTMLReporter implements ILogReporter {
    protected options: IOptions;
    constructor(options: IOptions);
    report(reporter: Map<string, IReport>): void;
    statisticCommentRate(report: IReport): string;
}
