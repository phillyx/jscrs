"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionName = exports.getAllPaths = exports.resolves = exports.getRootPath = exports.isFile = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const utils_1 = require("./utils");
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
    if (dir.startsWith('./')) {
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
    if (utils_1.isString(pathList)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2ZzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNEI7QUFDNUIsdUNBQXdCO0FBQ3hCLG1DQUFrQztBQUVsQyxTQUFnQixNQUFNLENBQUMsSUFBWTtJQUNqQyxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtLQUNyQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1Ysa0RBQWtEO1FBQ2xELE9BQU8sS0FBSyxDQUFBO0tBQ2I7QUFDSCxDQUFDO0FBUkQsd0JBUUM7QUFDRCxTQUFnQixXQUFXO0lBQ3pCLGlCQUFpQjtJQUNqQixPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQzFDLENBQUM7QUFIRCxrQ0FHQztBQUNEOzs7O0dBSUc7QUFDVSxRQUFBLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBVSxFQUFFO0lBQzlDLElBQUksU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFBO0lBQzdCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzQixPQUFPLEdBQUcsQ0FBQTtLQUNYO0lBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDNUQ7SUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDdEQsQ0FBQyxDQUFBO0FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFnQixFQUFZLEVBQUU7SUFDN0MsSUFBSSxRQUFRLEdBQWEsRUFBRSxDQUFBO0lBRTNCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBUyxFQUFRLEVBQUU7UUFDL0IsaUJBQWlCO1FBQ2pCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMzQiw4QkFBOEI7WUFDOUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM3QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNYLDhCQUE4QjtnQkFDOUIsa0JBQWtCO2dCQUNsQiwwQ0FBMEM7YUFDM0M7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtJQUNELElBQUksQ0FBQyxnQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDeEIsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBRVksUUFBQSxXQUFXLEdBQUcsQ0FBQyxRQUFnQyxFQUFpQixFQUFFO0lBQzdFLElBQUksZ0JBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0QixRQUFRLEdBQUcsQ0FBQyxRQUFrQixDQUFDLENBQUE7S0FDaEM7SUFDRCxJQUFJLEdBQUcsR0FBYSxFQUFFLENBRXJCO0lBQUMsUUFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pCLENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUE7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxDQUFTO0lBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbEMsQ0FBQztBQUZELDRDQUVDIn0=