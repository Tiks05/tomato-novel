import type { UserInfo } from './user-info.types'

export interface LoginOrRegisterResponse {
  user: UserInfo
  access_token: string
}
