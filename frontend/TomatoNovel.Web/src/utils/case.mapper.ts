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
 * snake_case → PascalCase
 * become_author_at → BecomeAuthorAt
 */
export function snakeToPascal(key: string): string {
  return key
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * 判断是否为普通对象
 */
function isPlainObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 深度映射工具（核心）
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
 * 后端 → 前端
 * PascalCase → snake_case
 *
 * ⭐ 关键点：
 * 1. 只处理 body.data
 * 2. 自动摊平 { items: [] }，避免 bannerList.map 报错
 */
export function mapResponse<T = any>(data: T): T {
  const mapped = deepMap(data, pascalToSnake)

  // 🔑 自动处理列表响应：{ items: [...] } → [...]
  if (mapped && typeof mapped === 'object' && 'items' in mapped && Array.isArray((mapped as any).items)) {
    return (mapped as any).items
  }

  return mapped
}

/**
 * 前端 → 后端
 * snake_case → PascalCase
 */
export function mapRequest<T = any>(data: T): T {
  return deepMap(data, snakeToPascal)
}
