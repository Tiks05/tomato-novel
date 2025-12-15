import request from '@/utils/request'

// -------------------------------
// 导入 Request Types
// -------------------------------
import type { NewsListRequest } from '@/types/home/requests/news-list-request.types'
import type { RankingRequest } from '@/types/home/requests/ranking-request.types'

// -------------------------------
// 导入 Response Types
// -------------------------------
import type { TopBookResponse } from '@/types/home/responses/top-book-response.types'
import type { NewsResponse } from '@/types/home/responses/news-response.types'
import type { WriterResponse } from '@/types/home/responses/writer-response.types'
import type { RecommendResponse } from '@/types/home/responses/recommend-response.types'
import type { BookRankingResponse } from '@/types/home/responses/book-ranking-response.types'
import type { RecentUpdateResponse } from '@/types/home/responses/recent-update-response.types'

/**
 * 获取首页顶部推荐书籍
 */
export const fetchTopBooks = () => {
  return request.get<TopBookResponse[]>('/home/top-books')
}

/**
 * 获取首页最新资讯
 */
export const fetchNewsList = (params: NewsListRequest) => {
  return request.get<NewsResponse[]>('/home/news-list', { params })
}

/**
 * 获取首页作家列表
 */
export const getWriterList = () => {
  return request.get<WriterResponse[]>('/home/writer-list')
}

/**
 * 获取首页推荐书籍（男 / 女频道）
 */
export const getRecommendBooks = () => {
  return request.get<RecommendResponse>('/home/recommend')
}

/**
 * 获取首页排行榜
 */
export const fetchRankingList = (params: RankingRequest) => {
  return request.get<BookRankingResponse[]>('/home/ranking', { params })
}

/**
 * 获取最近更新
 */
export const getRecentUpdates = () => {
  return request.get<RecentUpdateResponse[]>('/home/recent-updates')
}
