// recommend-response.types.ts

import type { BookResponse } from './book-response.types'

/**
 * 编辑推荐响应
 */
export interface RecommendResponse {
  /** 男生频道推荐 */
  male: BookResponse[]

  /** 女生频道推荐 */
  female: BookResponse[]
}
