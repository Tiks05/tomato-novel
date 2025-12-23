import type { BookRankItem } from './book-rank-item.types'

export interface BookRankResponse {
  plot_type: string
  child: BookRankItem[]
}
