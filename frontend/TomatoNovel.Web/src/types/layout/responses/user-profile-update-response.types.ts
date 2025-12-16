// 用户资料更新响应
export interface UserProfileUpdateResponse {
  /** 头像（绝对路径） */
  avatar: string

  /** 昵称 */
  nickname: string

  /** 个性签名 */
  signature: string
}
