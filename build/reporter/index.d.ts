import { IOptions } from '../interfaces/options.i';
import { ILogReporter } from '../interfaces/log.i';
export declare function registerReporter(name: string, reporter: ILogReporter): void;
export declare function getRegisteredReporters(): {
    [key: string]: ILogReporter;
};
export declare function registerReporterByName(options: IOptions): void;
