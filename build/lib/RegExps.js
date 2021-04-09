"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_HTMLLIKE_Regex = exports.getRegex = exports.getRegExpsByExtensionName = exports.CommonCommentFormats = exports.RegExps = void 0;
const utils_1 = require("./utils");
const formats_1 = require("./formats");
exports.RegExps = {
    singleLine: new RegExp(/\/\/.+/, 'mg'),
    multiLine: new RegExp(/\/\*\*.*\s+(\*.+\s+)*\*\/$/, 'mg'),
    markup: new RegExp(/<!--[^--]*-->$/, 'mg'),
    script: new RegExp(/(<script(.)*?>)([\s\S](?!<script))*(<\/script>)$/, 'mg'),
    style: new RegExp(/(<style(.)*?>)([\s\S](?!<style))*(<\/style>)$/, 'mg')
};
exports.CommonCommentFormats = new Map([
    ['singleLine', exports.RegExps.singleLine],
    ['multiLine', exports.RegExps.multiLine],
    ['markup', exports.RegExps.markup],
    ['script', exports.RegExps.script],
    ['style', exports.RegExps.style]
]);
exports.getRegExpsByExtensionName = (x) => {
    if (formats_1.HTMLLIKE_EXTS.includes(x)) {
        return [exports.RegExps.singleLine, exports.RegExps.multiLine, exports.RegExps.markup];
    }
    return [exports.RegExps.singleLine, exports.RegExps.multiLine];
};
exports.getRegex = (regName) => {
    let r = exports.CommonCommentFormats.get(regName);
    if (utils_1.isUndefined(r)) {
        r = /^.*$/;
    }
    return r;
};
exports.get_HTMLLIKE_Regex = (extensionName) => {
    if (formats_1.HTMLLIKE_EXTS.includes(extensionName)) {
        return [exports.RegExps.style, exports.RegExps.script];
    }
    return [];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnRXhwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvUmVnRXhwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBcUM7QUFDckMsdUNBQXlDO0FBRTVCLFFBQUEsT0FBTyxHQUFHO0lBQ3JCLFVBQVUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO0lBQ3RDLFNBQVMsRUFBRSxJQUFJLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUM7SUFDekQsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQztJQUMxQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsa0RBQWtELEVBQUUsSUFBSSxDQUFDO0lBQzVFLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUM7Q0FDekUsQ0FBQTtBQUNZLFFBQUEsb0JBQW9CLEdBQXdCLElBQUksR0FBRyxDQUFDO0lBQy9ELENBQUMsWUFBWSxFQUFFLGVBQU8sQ0FBQyxVQUFVLENBQUM7SUFDbEMsQ0FBQyxXQUFXLEVBQUUsZUFBTyxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDLFFBQVEsRUFBRSxlQUFPLENBQUMsTUFBTSxDQUFDO0lBQzFCLENBQUMsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNLENBQUM7SUFDMUIsQ0FBQyxPQUFPLEVBQUUsZUFBTyxDQUFDLEtBQUssQ0FBQztDQUN6QixDQUFDLENBQUE7QUFFVyxRQUFBLHlCQUF5QixHQUFHLENBQUMsQ0FBUyxFQUFZLEVBQUU7SUFDL0QsSUFBSSx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3QixPQUFPLENBQUMsZUFBTyxDQUFDLFVBQVUsRUFBRSxlQUFPLENBQUMsU0FBUyxFQUFFLGVBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUMvRDtJQUNELE9BQU8sQ0FBQyxlQUFPLENBQUMsVUFBVSxFQUFFLGVBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVoRCxDQUFDLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRyxDQUFDLE9BQWUsRUFBVSxFQUFFO0lBQ2xELElBQUksQ0FBQyxHQUFHLDRCQUFvQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN6QyxJQUFJLG1CQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbEIsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtLQUNYO0lBQ0QsT0FBTyxDQUFXLENBQUE7QUFDcEIsQ0FBQyxDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRyxDQUFDLGFBQXFCLEVBQVksRUFBRTtJQUNwRSxJQUFJLHVCQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxlQUFPLENBQUMsS0FBSyxFQUFFLGVBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUN2QztJQUNELE9BQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQyxDQUFBIn0=