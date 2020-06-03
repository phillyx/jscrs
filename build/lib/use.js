"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detectInstalled = require('detect-installed');
var ModuleType;
(function (ModuleType) {
    ModuleType["reporter"] = "reporter";
    ModuleType["mode"] = "mode";
    ModuleType["db"] = "db";
    ModuleType["tokenizer"] = "tokenizer";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
/**
 * import reporter
 * @param name
 * @deprecated
 */
function useReporter(name) {
    return use(name, ModuleType.reporter);
}
exports.useReporter = useReporter;
/**
 * import mode
 * @param name
 * @deprecated
 */
function useMode(name) {
    return use(name, ModuleType.mode);
}
exports.useMode = useMode;
function use(name, type) {
    const packageName = `jscrs-${name}-${type}`;
    if (!detectInstalled.sync(packageName, { local: true })) {
        throw new Error(`Module (type: ${type}) "${packageName}" does not found, please check that you have installed the package`);
    }
    return require(packageName).default;
}
exports.use = use;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi91c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVwRCxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDcEIsbUNBQXFCLENBQUE7SUFDckIsMkJBQWEsQ0FBQTtJQUNiLHVCQUFTLENBQUE7SUFDVCxxQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBTFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFLckI7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLElBQVk7SUFDdEMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRkQsa0NBRUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLElBQVk7SUFDbEMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRkQsMEJBRUM7QUFFRCxTQUFnQixHQUFHLENBQUksSUFBWSxFQUFFLElBQWdCO0lBQ25ELE1BQU0sV0FBVyxHQUFHLFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQ2IsaUJBQWlCLElBQUksTUFBTSxXQUFXLG9FQUFvRSxDQUMzRyxDQUFDO0tBQ0g7SUFDRCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDdEMsQ0FBQztBQVJELGtCQVFDIn0=