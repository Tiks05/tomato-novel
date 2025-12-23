import type { VolumeItem } from './volume-item.types'
import type { ChapterItem } from './chapter-item.types'

export interface ChapterListResponse {
  title: string
  volumes: VolumeItem[]
  list: ChapterItem[]
}
