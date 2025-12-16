import request from '@/utils/request'

// -------------------------------
// 导入类型：请求 & 响应
// -------------------------------
import type { LoginOrRegisterRequest } from '@/types/auth/requests/login-or-register-request.types'

import type { LoginOrRegisterResponse } from '@/types/auth/responses/login-or-register-response.types'

// -------------------------------
// 发送验证码
// -------------------------------
export const sendCode = (phone: string) => {
  return request.post('/auth/login-or-register/sms', { phone })
}

// -------------------------------
// 验证码登录
// -------------------------------
export const loginByCode = (phone: string, code: string) => {
  return request.post('/auth/login-or-register/code', { phone, code })
}

// -------------------------------
// 密码登录（自动注册）——带泛型约束
// -------------------------------
export const loginByPassword = (data: LoginOrRegisterRequest) => {
  return request.post<LoginOrRegisterResponse>('/auth/login-or-register/pwd', data)
}
