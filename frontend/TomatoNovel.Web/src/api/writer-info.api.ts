import request from '@/utils/request'

import type { WriterHeaderResponse } from '@/types/writer-info/responses/writer-header-response.types'
import type { WriterWorksResponse } from '@/types/writer-info/responses/writer-works-response.types'

/**
 * 获取作者主页头部信息
 */
export const getWriterHeader = (writer_id: string | number) => {
  return request.get<WriterHeaderResponse>(`/writer-info/header/${writer_id}`)
}

/**
 * 获取作者作品列表
 */
export const getWriterWorks = (writer_id: string | number) => {
  return request.get<WriterWorksResponse>(`/writer-info/works/${writer_id}`)
}
