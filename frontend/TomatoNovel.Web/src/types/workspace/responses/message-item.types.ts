/**
 * Represents a single message item.
 */
export interface MessageItem {
  /**
   * Message identifier
   */
  id: number

  /**
   * Message category
   * 审核提醒 / 作品通知 / 活动通知 / 系统通知 / 互动通知
   */
  category: string

  /**
   * Message title
   */
  title?: string

  /**
   * Message content (HTML allowed)
   */
  content: string

  /**
   * Display time string (e.g. 12-15)
   */
  time: string

  /**
   * Whether the message has been read
   */
  is_read: boolean
}
