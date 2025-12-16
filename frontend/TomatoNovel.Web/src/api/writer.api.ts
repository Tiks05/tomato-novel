import request from '@/utils/request'

import type { WriterNewsQueryRequest } from '@/types/writer/requests/writer-news-query-request.types'
import type { WriterClassroomQueryRequest } from '@/types/writer/requests/writer-classroom-query-request.types'

import type { WriterActiveResponse } from '@/types/writer/responses/writer-active-response.types'
import type { WriterNoticeResponse } from '@/types/writer/responses/writer-notice-response.types'
import type { WriterPicNoticeResponse } from '@/types/writer/responses/writer-pic-notice-response.types'
import type { WriterClassroomResponse } from '@/types/writer/responses/writer-classroom-response.types'

/**
 * 获取作家资讯列表
 * 后端可能返回：
 * - WriterActiveResponse[]
 * - WriterNoticeResponse[]
 * - WriterPicNoticeResponse[]
 */
export function getNewsList(params: WriterNewsQueryRequest) {
  return request.get<WriterActiveResponse[] | WriterNoticeResponse[] | WriterPicNoticeResponse[]>('/writer/news', {
    params,
  })
}

/**
 * 获取作家课堂列表
 */
export function fetchClassroomList(params: WriterClassroomQueryRequest) {
  return request.get<WriterClassroomResponse[]>('/writer/classroom', { params })
}
