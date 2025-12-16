// 搜索书籍请求参数
export interface SearchBookRequest {
  /** 搜索关键词（书名 / 作者） */
  keyword?: string

  /**
   * 排序方式
   * 0 - 相关（默认）
   * 1 - 最热
   * 2 - 最新
   */
  type: number

  /** 更新时间索引（0=全部, 1=过去三十分钟, ...） */
  time_index: number

  /** 字数区间索引（0=全部, 1=30万字以下, ...） */
  num_index: number

  /**
   * 连载状态索引
   * 0 - 全部
   * 1 - 已完结
   * 2 - 连载中
   */
  state_index: number

  /** 当前页，从 1 开始 */
  page: number

  /** 每页条数 */
  page_size: number
}
