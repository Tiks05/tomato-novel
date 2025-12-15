// src/types/home/requests/adapt-list-request.types.ts

/**
 * 改编作品列表请求参数
 */
export interface AdaptListRequest {
  /**
   * 返回改编作品条数
   * 可选，不传则由后端决定
   */
  limit?: number
}
