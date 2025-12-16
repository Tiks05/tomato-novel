import request from '@/utils/request'

import type { AdaptListRequest } from '@/types/common/requests/adapt-list-request.types'
import type { BannerListRequest } from '@/types/common/requests/banner-list-request.types'

import type { AdaptListResponse } from '@/types/common/responses/adapt-list-response.types'
import type { BannerItemResponse } from '@/types/common/responses/banner-item-response.types'

export function getBannerList(params: BannerListRequest) {
  return request.get<BannerItemResponse>('/common/banner-list', { params })
}

/**
 * 获取首页改编作品列表
 */
export const getAdaptList = (params?: AdaptListRequest) => {
  return request.get<AdaptListResponse>('/common/adaptlist', { params })
}
