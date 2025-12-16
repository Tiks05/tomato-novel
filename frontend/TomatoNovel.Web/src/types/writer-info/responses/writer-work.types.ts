// writer-work.types.ts

export interface WriterWork {
  title: string
  cover_url: string
  status: string
  word_count: number
  tags: string
  intro: string
  updated_at?: string
  bookinfo_path: string
  max_chapter?: number
  max_chapter_title?: string
}
