import { IOptions } from "../interfaces/options.i";
import { ILogReporter } from "../interfaces/log.i";
import { IReport } from "../interfaces/report.i";
export declare class JSONReporter implements ILogReporter {
    protected options: IOptions;
    constructor(options: IOptions);
    report(reporter: Map<string, IReport>): void;
}
