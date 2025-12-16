import type { BookVolume } from './book-volume.types'

export interface BookContentResponse {
  intro: string
  volumes: BookVolume[]
}
