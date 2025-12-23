export interface LastChapterResponse {
  volume_title?: string
  current_volume_id?: number
  last_volume_id: number
  last_volume_title: string
  chapter_index: number
  chapter_title?: string
  updated_at?: string
}
