/**
 * PascalCase → snake_case
 * BecomeAuthorAt → become_author_at
 */
export function pascalToSnake(key: string): string {
  return key
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
}

/**
 * PascalCase → camelCase
 * BecomeAuthorAt → becomeAuthorAt
 */
export function pascalToCamel(key: string): string {
  return key.charAt(0).toLowerCase() + key.slice(1)
}

/**
 * snake_case → camelCase
 * become_author_at → becomeAuthorAt
 */
export function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * camelCase → snake_case
 * becomeAuthorAt → become_author_at
 */
export function camelToSnake(key: string): string {
  return key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

/**
 * 判断是否为普通对象
 */
function isPlainObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 深度映射工具 —— 内部使用
 */
function deepMap(obj: any, keyMapper: (k: string) => string): any {
  if (Array.isArray(obj)) {
    return obj.map(item => deepMap(item, keyMapper))
  }

  if (isPlainObject(obj)) {
    const result: any = {}
    Object.keys(obj).forEach(key => {
      const mappedKey = keyMapper(key)
      result[mappedKey] = deepMap(obj[key], keyMapper)
    })
    return result
  }

  return obj
}

/**
 * 后端 → 前端：PascalCase → snake_case（响应拦截器用）
 */
export function mapResponse<T = any>(data: T): T {
  return deepMap(data, pascalToSnake)
}

/**
 * 前端 → 后端：snake_case → camelCase（请求拦截器用）
 */
export function mapRequest<T = any>(data: T): T {
  return deepMap(data, snakeToCamel)
}
