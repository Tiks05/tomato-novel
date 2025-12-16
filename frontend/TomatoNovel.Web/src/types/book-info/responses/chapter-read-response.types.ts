export interface ChapterReadResponse {
  book_title: string
  chapter_title: string
  word_count: number
  updated_at: string
  content: string
  chapter_index: number
  prev_chapter_id: number | null
  next_chapter_id: number | null
}
