// book-ranking-response.types.ts

import type { RankingBookResponse } from './ranking-book-response.types'

/**
 * 分类榜单响应
 */
export interface BookRankingResponse {
  /** 分类名称（如 东方玄幻） */
  plot_type: string

  /** 热门榜 */
  child: RankingBookResponse[]

  /** 新书榜 */
  new_child: RankingBookResponse[]
}
