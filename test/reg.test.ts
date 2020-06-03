/* tslint:disable */
import { CommonCommentFormats } from "../src/lib/RegExps";
import { isUndefined, isNullOrUndefined } from "util";
import * as fs from 'fs'
import * as path from 'path'

it('test single line regex', () => {
  const getTestFileStream = (): string => {
    const s = fs.readFileSync(path.join(process.cwd(), '/src/analysis.ts'), { encoding: "utf-8" })
    // console.log(s)
    return s
  }
  const getsingleLineRegex = (): RegExp => {
    let r = CommonCommentFormats.get('singleLine')
    if (isUndefined(r)) {
      r = /^.*$/
    }
    return r
  }
  const getMatchs = () => {
    let m = getTestFileStream().match(getsingleLineRegex())
    console.log(m)
    if (isNullOrUndefined(m)) {
      return []
    }
    return m
  }
  expect(getMatchs().length > 0).toBe(true)
})

it('test multi line regex', () => {
  const getTestFileStream = (): string => {
    const s = fs.readFileSync(path.join(process.cwd(), '/src/analysis.ts'), { encoding: "utf-8" })
    return s
  }
  const getsingleLineRegex = (): RegExp => {
    let r = CommonCommentFormats.get('multiLine')
    if (isUndefined(r)) {
      r = /^.*$/
    }
    return r
  }
  const getMatchs = () => {
    let m = getTestFileStream().match(getsingleLineRegex())
    console.log(m)
    if (isNullOrUndefined(m)) {
      return []
    }
    return m
  }
  expect(getMatchs().length > 0).toBe(true)
})

it('test markup regex', () => {
  const getTestFileStream = (): string => {
    const s = fs.readFileSync(path.join(process.cwd(), '/test/data/test.html'), { encoding: "utf-8" })
    return s
  }
  const getsingleLineRegex = (): RegExp => {
    let r = CommonCommentFormats.get('markup')
    if (isUndefined(r)) {
      r = /^.*$/
    }
    // console.log(r)
    return r
  }
  const getMatchs = () => {
    let m = getTestFileStream().match(getsingleLineRegex())
    console.log(m)
    if (isNullOrUndefined(m)) {
      return []
    }
    return m
  }
  expect(getMatchs().length > 0).toBe(true)
})

it('test script regex', () => {
  const getTestFileStream = (): string => {
    const s = fs.readFileSync(path.join(process.cwd(), '/test/data/test.html'), { encoding: "utf-8" })
    return s
  }
  const getsingleLineRegex = (): RegExp => {
    let r = CommonCommentFormats.get('script')
    if (isUndefined(r)) {
      r = /^.*$/
    }
    // console.log(r)
    return r
  }
  const getMatchs = () => {
    let m = getTestFileStream().match(getsingleLineRegex())
    console.log(m)
    if (isNullOrUndefined(m)) {
      return []
    }
    return m
  }
  expect(getMatchs().length > 0).toBe(true)
})

it('test style regex', () => {
  const getTestFileStream = (): string => {
    const s = fs.readFileSync(path.join(process.cwd(), '/test/data/test.html'), { encoding: "utf-8" })
    return s
  }
  const getStyleRegex = (): RegExp => {
    let r = CommonCommentFormats.get('style')
    if (isUndefined(r)) {
      r = /^.*$/
    }
    // console.log(r)
    return r
  }
  const getMatchs = () => {
    let m = getTestFileStream().match(getStyleRegex())
    console.log(m)
    if (isNullOrUndefined(m)) {
      return []
    }
    return m
  }

  expect(getMatchs().length > 0).toBe(true)

  const  newStream=getTestFileStream().replace(getStyleRegex(), 'STYLEIGNORE');
  console.log(newStream)

  expect(newStream.includes('STYLEIGNORE')).toBe(true)
})