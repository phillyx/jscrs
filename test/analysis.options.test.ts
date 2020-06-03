import { prepareOptions, filterFilesByExtensionNameInOptions } from "../src/lib/options";
import { sync } from 'fast-glob';
import { basename } from 'path'
import { isUndefined } from "util";

it('test config options', () => {
  let options = prepareOptions()
  console.log(options, options.path.map(x => x.replace(/\\/g, '/')))
  const ignore = options.ignore
  let _files = sync(
    options.path
    , {
      ignore,
      onlyFiles: true,
      dot: false,
      stats: false,
      absolute: true,
    }
  )
  console.log(_files)
  // should not include 【node_modules】
  expect(_files.length > 0 && isUndefined(_files.find(x => x.indexOf('node_modules') > 0))).toBe(true)

  let files = filterFilesByExtensionNameInOptions(_files, options.ext)
  console.log(files)
  expect(_files.length > 0 &&
    isUndefined(
      _files.find(x => basename(x) === 'package-lock', 'json')
    )
  ).toBe(true)

})