import type { SearchBookItem } from './search-book-item.types'

// 搜索书籍响应
export interface SearchBookResponse {
  /** 总条数 */
  total: number

  /** 书籍列表 */
  records: SearchBookItem[]
}
