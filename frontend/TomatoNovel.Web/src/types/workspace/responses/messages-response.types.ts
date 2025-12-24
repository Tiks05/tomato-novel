import type { MessageItem } from './message-item.types'

/**
 * Response type for user message list.
 */
export interface MessagesResponse {
  /**
   * Message items
   */
  items: MessageItem[]

  /**
   * Total message count
   */
  total_count: number
}
