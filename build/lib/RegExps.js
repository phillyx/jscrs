"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
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
    if (util_1.isUndefined(r)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnRXhwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvUmVnRXhwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrQztBQUNsQyx1Q0FBeUM7QUFFNUIsUUFBQSxPQUFPLEdBQUc7SUFDckIsVUFBVSxFQUFFLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7SUFDdEMsU0FBUyxFQUFFLElBQUksTUFBTSxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQztJQUN6RCxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO0lBQzFDLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxrREFBa0QsRUFBRSxJQUFJLENBQUM7SUFDNUUsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQztDQUN6RSxDQUFBO0FBQ1ksUUFBQSxvQkFBb0IsR0FBd0IsSUFBSSxHQUFHLENBQUM7SUFDL0QsQ0FBQyxZQUFZLEVBQUUsZUFBTyxDQUFDLFVBQVUsQ0FBQztJQUNsQyxDQUFDLFdBQVcsRUFBRSxlQUFPLENBQUMsU0FBUyxDQUFDO0lBQ2hDLENBQUMsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNLENBQUM7SUFDMUIsQ0FBQyxRQUFRLEVBQUUsZUFBTyxDQUFDLE1BQU0sQ0FBQztJQUMxQixDQUFDLE9BQU8sRUFBRSxlQUFPLENBQUMsS0FBSyxDQUFDO0NBQ3pCLENBQUMsQ0FBQTtBQUVXLFFBQUEseUJBQXlCLEdBQUcsQ0FBQyxDQUFTLEVBQVksRUFBRTtJQUMvRCxJQUFJLHVCQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxlQUFPLENBQUMsVUFBVSxFQUFFLGVBQU8sQ0FBQyxTQUFTLEVBQUUsZUFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQy9EO0lBQ0QsT0FBTyxDQUFDLGVBQU8sQ0FBQyxVQUFVLEVBQUUsZUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRWhELENBQUMsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBZSxFQUFVLEVBQUU7SUFDbEQsSUFBSSxDQUFDLEdBQUcsNEJBQW9CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pDLElBQUksa0JBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNsQixDQUFDLEdBQUcsTUFBTSxDQUFBO0tBQ1g7SUFDRCxPQUFPLENBQUMsQ0FBQTtBQUNWLENBQUMsQ0FBQTtBQUVZLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxhQUFxQixFQUFZLEVBQUU7SUFDcEUsSUFBSSx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUN6QyxPQUFPLENBQUMsZUFBTyxDQUFDLEtBQUssRUFBRSxlQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDdkM7SUFDRCxPQUFPLEVBQUUsQ0FBQTtBQUNYLENBQUMsQ0FBQSJ9