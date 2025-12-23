/**
 * 创建分卷 Request
 * 对应后端：CreateVolumeRequestDto
 */
export interface CreateVolumeRequest {
  /** 书籍 ID */
  book_id: number

  /** 分卷标题 */
  title: string

  /** 分卷排序（第几卷） */
  sort: number
}
