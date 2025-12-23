/**
 * 更新分卷 Request
 * 对应后端：UpdateVolumeRequestDto
 */
export interface UpdateVolumeRequest {
  /** 分卷 ID */
  id: number

  /** 书籍 ID */
  book_id: number

  /** 分卷标题 */
  title: string
}
