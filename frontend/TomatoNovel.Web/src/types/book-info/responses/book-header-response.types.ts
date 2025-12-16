import type { BookHeaderBook } from './book-header-book.types'
import type { BookHeaderAuthor } from './book-header-author.types'

export interface BookHeaderResponse {
  book: BookHeaderBook
  author: BookHeaderAuthor
}
