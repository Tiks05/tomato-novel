// ranking-book-response.types.ts

/**
 * 榜单中的单本书籍
 */
export interface RankingBookResponse {
  /** 排名（如 01 / 02） */
  num: string
  title: string
  desc: string
  path: string
  pic: string
  author: string
}
