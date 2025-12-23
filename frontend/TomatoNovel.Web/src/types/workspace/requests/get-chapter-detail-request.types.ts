/**
 * 获取章节详情 Request
 * 对应后端：ChapterDetailRequestDto
 */
export interface GetChapterDetailRequest {
  /** 书籍 ID */
  book_id: number

  /** 章节 ID */
  chapter_id: number
}
