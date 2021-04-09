export declare function isFile(path: string): boolean;
export declare function getRootPath(): string;
/**
 * 根据相对路径或绝对路径 和process.cwd() 拼接返回绝对路径
 * @param dir 路径地址
 * @returns 返回绝对路径
 */
export declare const resolves: (dir: string) => string;
export declare const getAllPaths: (pathList: Array<string> | string) => Array<string>;
export declare function getExtensionName(p: string): string;
