// 搜索结果中的单本书籍
export interface SearchBookItem {
  title: string
  author: string
  status: string
  word_count: number
  intro: string
  updatedAt: string

  /** 封面图（绝对路径） */
  pic: string

  /** 收藏 / 人气 */
  people: number

  /** 最新章节标题 */
  update: string

  /** 书籍详情页路径 */
  path: string

  /** 第一章阅读路径 */
  read_path: string

  /** 最新章节阅读路径 */
  update_path: string
}
