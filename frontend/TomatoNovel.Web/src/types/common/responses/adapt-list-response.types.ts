// adapt-list-response.types.ts

import type { AdaptBookResponse } from '../../common/responses/adapt-book-response.types'

/**
 * 改编作品列表响应
 */
export interface AdaptListResponse {
  data: AdaptBookResponse[]
}
