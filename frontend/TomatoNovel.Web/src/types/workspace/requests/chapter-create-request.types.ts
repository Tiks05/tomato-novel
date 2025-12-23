export interface ChapterCreateRequest {
  book_id: number
  volume_id?: number
  title: string
  content: string
  word_count: number
}
