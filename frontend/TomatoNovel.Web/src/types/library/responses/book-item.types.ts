/**
 * BookItemDto
 * 书籍列表项
 */
export interface BookItem {
  id: number
  title: string
  author: string
  status: string
  word_count: number
  intro: string
  cover_url: string
  updated_at: string
  path: string
}
