import { IOptions } from "../interfaces/options.i";
import { Command } from "commander";
export declare function getDefaultOptions(): IOptions;
/**
 * 获取自定义配置项
 */
export declare const getCutomOptions: () => object | null;
export declare function getConfigOption(name: string, options?: IOptions): any;
/**
 * 对ignore规范化
 * './ignore/**', '/ignore', 'ignore/'
 * @param options IConfigOptions
 */
export declare function prepareIgnore(options: IOptions): IOptions;
/**
 * 支持 ./src ,/src, src/  以及全路径
 */
export declare function preparePath(p: string[]): string[];
export declare function prepareOptions(cli?: Command): IOptions;
export declare function filterFilesByExtensionNameInOptions(files: string[], extensionNames: string[]): string[];
