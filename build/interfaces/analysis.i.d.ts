import { IOptions } from "./options.i";
import { IReport } from "./report.i";
export interface IAnalysis {
    conf: IOptions;
    fileList?: string[];
    ext2FileList: Map<string, string[]>;
    rateReport?: Map<string, IReport>;
}
