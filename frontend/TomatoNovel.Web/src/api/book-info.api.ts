import request from '@/utils/request'

import type { BookHeaderResponse } from '@/types/book-info/responses/book-header-response.types'
import type { BookContentResponse } from '@/types/book-info/responses/book-content-response.types'
import type { ChapterReadRequest } from '@/types/book-info/requests/chapter-read-request.types'
import type { ChapterReadResponse } from '@/types/book-info/responses/chapter-read-response.types'

/**
 * 获取小说头部信息
 */
export const getBookHeader = (id: string | number) => {
  return request.get<BookHeaderResponse>(`/book-info/header/${id}`)
}

/**
 * 获取小说简介与目录
 */
export const getBookContent = (id: string | number) => {
  return request.get<BookContentResponse>(`/book-info/content/${id}`)
}

/**
 * 获取章节内容
 */
export const getChapterContent = (params: ChapterReadRequest) => {
  return request.get<ChapterReadResponse>('/book-info/chapter', {
    params,
  })
}
