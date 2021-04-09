export function isUndefined(value: any) {
  return value === undefined
}
export function isNull(value: any) {
  return value === null
}
export function isNullOrUndefined(value: any) {
  return value === null || value === undefined
}

export function isString(value: any) {
  return typeof value === 'string'
}
