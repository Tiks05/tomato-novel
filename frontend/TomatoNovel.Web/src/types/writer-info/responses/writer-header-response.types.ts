// writer-header-response.types.ts

export interface WriterHeaderResponse {
  writer: {
    nickname: string
    avatar_url: string
    signature: string
    intro: string
    become_author_at: string
    total_words: number
    follower_count: number
  }
}
