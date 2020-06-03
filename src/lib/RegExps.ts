import { isUndefined } from "util"
import { HTMLLIKE_EXTS } from "./formats"

export const RegExps = {
  singleLine: new RegExp(/\/\/.+/, 'mg'),
  multiLine: new RegExp(/\/\*\*.*\s+(\*.+\s+)*\*\/$/, 'mg'),
  markup: new RegExp(/<!--[^--]*-->$/, 'mg'),
  script: new RegExp(/(<script(.)*?>)([\s\S](?!<script))*(<\/script>)$/, 'mg'),
  style: new RegExp(/(<style(.)*?>)([\s\S](?!<style))*(<\/style>)$/, 'mg')
}
export const CommonCommentFormats: Map<string, RegExp> = new Map([
  ['singleLine', RegExps.singleLine],
  ['multiLine', RegExps.multiLine],
  ['markup', RegExps.markup],// <!--[\w\W]*?-->
  ['script', RegExps.script],
  ['style', RegExps.style]
])

export const getRegExpsByExtensionName = (x: string): RegExp[] => {
  if (HTMLLIKE_EXTS.includes(x)) {
    return [RegExps.singleLine, RegExps.multiLine, RegExps.markup]
  }
  return [RegExps.singleLine, RegExps.multiLine]

}

export const getRegex = (regName: string): RegExp => {
  let r = CommonCommentFormats.get(regName)
  if (isUndefined(r)) {
    r = /^.*$/
  }
  return r
}

export const get_HTMLLIKE_Regex = (extensionName: string): RegExp[] => {
  if (HTMLLIKE_EXTS.includes(extensionName)) {
    return [RegExps.style, RegExps.script]
  }
  return []
}