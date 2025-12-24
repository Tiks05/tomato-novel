/**
 * Request type for marking messages as read.
 */
export interface MarkMessagesAsReadRequest {
  /**
   * Message id list to mark as read
   */
  message_ids: number[]
}
