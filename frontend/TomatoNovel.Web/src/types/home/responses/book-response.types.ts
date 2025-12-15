// book-response.types.ts

/**
 * 通用书籍信息
 */
export interface BookResponse {
  id: number
  title: string
  desc: string
  cover_url: string
  author_nickname: string
  path: string
}
