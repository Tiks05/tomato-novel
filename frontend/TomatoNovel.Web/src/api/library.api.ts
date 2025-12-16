import request from '@/utils/request'
import type { BookListQueryRequest } from '@/types/library/requests/book-list-query-request.types'
import type { BookListResponse } from '@/types/library/responses/book-list-response.types'

/**
 * 图书列表查询
 */
export const getBookList = (params: BookListQueryRequest) => {
  return request.get<BookListResponse>('/library/books', {
    params,
  })
}
