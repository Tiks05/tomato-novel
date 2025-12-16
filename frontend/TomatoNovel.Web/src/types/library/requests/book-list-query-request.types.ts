/**
 * BookListQueryRequestDto
 * 获取书库列表查询参数
 */
export interface BookListQueryRequest {
  reader_type?: string
  category_group?: string
  category_type?: string
  status?: string
  word_count_range?: string
  sort?: string
  page?: number
  page_size?: number
}
