export declare const RegExps: {
    singleLine: RegExp;
    multiLine: RegExp;
    markup: RegExp;
    script: RegExp;
    style: RegExp;
};
export declare const CommonCommentFormats: Map<string, RegExp>;
export declare const getRegExpsByExtensionName: (x: string) => RegExp[];
export declare const getRegex: (regName: string) => RegExp;
export declare const get_HTMLLIKE_Regex: (extensionName: string) => RegExp[];
