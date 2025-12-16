import type { BookItem } from './book-item.types'

/**
 * BookListResponseDto
 * 书库列表返回结果
 */
export interface BookListResponse {
  total: number
  records: BookItem[]
}
