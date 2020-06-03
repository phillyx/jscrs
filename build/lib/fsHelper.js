"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const util_1 = require("util");
function isFile(path) {
    try {
        const stat = fs.lstatSync(path);
        return stat.isFile();
    }
    catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}
exports.isFile = isFile;
function getRootPath() {
    // 反斜杠转换，glob包不识别
    return process.cwd().replace(/\\/g, '/');
}
exports.getRootPath = getRootPath;
/**
 * 根据相对路径或绝对路径 和process.cwd() 拼接返回绝对路径
 * @param dir 路径地址
 * @returns 返回绝对路径
 */
exports.resolves = (dir) => {
    let ROOT_PATH = getRootPath();
    if (dir.includes(ROOT_PATH)) {
        return dir;
    }
    if (dir.startsWith('.\/')) {
        return path.join(ROOT_PATH, '../', dir).replace(/\\/g, '/');
    }
    return path.join(ROOT_PATH, dir).replace(/\\/g, '/');
};
const getPath = (rootPath) => {
    let fileList = [];
    const func = (p) => {
        // console.log(p)
        let files = fs.readdirSync(p);
        files.forEach(x => {
            let xPath = path.join(p, x);
            // console.log('fPath', xPath)
            let stat = fs.statSync(xPath);
            if (stat.isDirectory()) {
                fileList.push(xPath);
                func(xPath);
                // } else if (stat.isFile()) {
                // 检查文件类型是否存在于配置项内
                // if (conf.ext.includes(path.extname(x)))
            }
        });
    };
    func(exports.resolves(rootPath));
    return fileList;
};
exports.getAllPaths = (pathList) => {
    if (util_1.isString(pathList)) {
        pathList = [pathList];
    }
    let arr = [];
    pathList.forEach(x => {
        arr.push(...getPath(x));
    });
    return arr;
};
function getExtensionName(p) {
    return path.extname(p).substr(1);
}
exports.getExtensionName = getExtensionName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2ZzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUE0QjtBQUM1Qix1Q0FBd0I7QUFDeEIsK0JBQWdDO0FBRWhDLFNBQWdCLE1BQU0sQ0FBQyxJQUFZO0lBQ2pDLElBQUk7UUFDRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixrREFBa0Q7UUFDbEQsT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUM7QUFSRCx3QkFRQztBQUNELFNBQWdCLFdBQVc7SUFDekIsaUJBQWlCO0lBQ2pCLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDMUMsQ0FBQztBQUhELGtDQUdDO0FBQ0Q7Ozs7R0FJRztBQUNVLFFBQUEsUUFBUSxHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDOUMsSUFBSSxTQUFTLEdBQUcsV0FBVyxFQUFFLENBQUE7SUFDN0IsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sR0FBRyxDQUFBO0tBQ1g7SUFDRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtLQUM1RDtJQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN0RCxDQUFDLENBQUE7QUFFRCxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQWdCLEVBQVksRUFBRTtJQUM3QyxJQUFJLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFNUIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFTLEVBQVEsRUFBRTtRQUMvQixpQkFBaUI7UUFDakIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLDhCQUE4QjtZQUM5QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ1osOEJBQThCO2dCQUM5QixrQkFBa0I7Z0JBQ2xCLDBDQUEwQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBO0lBQ0QsSUFBSSxDQUFDLGdCQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUN4QixPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFFWSxRQUFBLFdBQVcsR0FBRyxDQUFDLFFBQWdDLEVBQWlCLEVBQUU7SUFDN0UsSUFBSSxlQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdEIsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDdEI7SUFDRCxJQUFJLEdBQUcsR0FBYSxFQUFFLENBQUE7SUFFdEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDRixPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMsQ0FBQTtBQUVELFNBQWdCLGdCQUFnQixDQUFDLENBQVM7SUFDeEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsQyxDQUFDO0FBRkQsNENBRUMifQ==