export interface ChapterItem {
  id: number
  volume_id: number
  chapter_num: number
  title: string
  word_count: number
  updated_at: string
  status?: string
  status_text?: string
  typo_count: number
}
