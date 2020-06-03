import { IMode } from '..';
export declare enum ModuleType {
    reporter = "reporter",
    mode = "mode",
    db = "db",
    tokenizer = "tokenizer"
}
/**
 * import reporter
 * @param name
 * @deprecated
 */
export declare function useReporter(name: string): unknown;
/**
 * import mode
 * @param name
 * @deprecated
 */
export declare function useMode(name: string): IMode;
export declare function use<T>(name: string, type: ModuleType): T;
