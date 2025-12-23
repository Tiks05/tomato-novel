export interface ChapterUpdateRequest {
  book_id: number
  chapter_id: number
  chapter_num: number
  title: string
  content: string
  word_count: number
  is_draft: boolean
}
