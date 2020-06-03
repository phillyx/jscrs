import * as path from 'path'
import * as fs from 'fs'
import { isString } from 'util';

export function isFile(path: string): boolean {
  try {
    const stat: fs.Stats = fs.lstatSync(path);
    return stat.isFile();
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
}
export function getRootPath() {
  // 反斜杠转换，glob包不识别
  return process.cwd().replace(/\\/g, '/')
}
/**
 * 根据相对路径或绝对路径 和process.cwd() 拼接返回绝对路径
 * @param dir 路径地址
 * @returns 返回绝对路径
 */
export const resolves = (dir: string): string => {
  let ROOT_PATH = getRootPath()
  if (dir.includes(ROOT_PATH)) {
    return dir
  }
  if (dir.startsWith('.\/')) {
    return path.join(ROOT_PATH, '../', dir).replace(/\\/g, '/')
  }
  return path.join(ROOT_PATH, dir).replace(/\\/g, '/')
}

const getPath = (rootPath: string): string[] => {
  let fileList: string[] = [];

  const func = (p: string): void => {
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
  }
  func(resolves(rootPath))
  return fileList
}

export const getAllPaths = (pathList: Array<string> | string): Array<string> => {
  if (isString(pathList)) {
    pathList = [pathList]
  }
  let arr: string[] = []

  pathList.forEach(x => {
    arr.push(...getPath(x))
  })
  return arr
}

export function getExtensionName(p: string): string {
  return path.extname(p).substr(1)
}