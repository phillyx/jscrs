"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.useMode = exports.useReporter = exports.ModuleType = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi91c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFcEQsSUFBWSxVQUtYO0FBTEQsV0FBWSxVQUFVO0lBQ3BCLG1DQUFxQixDQUFBO0lBQ3JCLDJCQUFhLENBQUE7SUFDYix1QkFBUyxDQUFBO0lBQ1QscUNBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUxXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBS3JCO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxJQUFZO0lBQ3RDLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUZELGtDQUVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxJQUFZO0lBQ2xDLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUZELDBCQUVDO0FBRUQsU0FBZ0IsR0FBRyxDQUFJLElBQVksRUFBRSxJQUFnQjtJQUNuRCxNQUFNLFdBQVcsR0FBRyxTQUFTLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUN2RCxNQUFNLElBQUksS0FBSyxDQUNiLGlCQUFpQixJQUFJLE1BQU0sV0FBVyxvRUFBb0UsQ0FDM0csQ0FBQztLQUNIO0lBQ0QsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3RDLENBQUM7QUFSRCxrQkFRQyJ9