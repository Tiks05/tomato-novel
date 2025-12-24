/**
 * Request type for querying user messages.
 */
export interface GetUserMessagesRequest {
  /**
   * User identifier
   */
  user_id: number

  /**
   * Message type filter
   * 审核提醒 / 作品通知 / 活动通知 / 系统通知 / 互动通知
   * Undefined or empty means all types
   */
  type?: string

  /**
   * Page number
   */
  page: number

  /**
   * Page size
   */
  page_size: number
}
