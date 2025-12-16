import type { BookChapter } from './book-chapter.types'

export interface BookVolume {
  title: string
  chapter_count: number
  chapters: BookChapter[]
}
