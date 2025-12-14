import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { mapRequest, mapResponse } from '@/utils/case.mapper'
import { useUserStore } from '@/store/use-user-store'

// 创建实例
const httpInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

/**
 * 请求拦截器
 * 1. 自动注入 token（从 zustand）
 * 2. 请求数据 snake_case -> camelCase
 */
httpInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 注入 Authorization
    const token = useUserStore.getState().authToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.data) {
      config.data = mapRequest(config.data)
    }

    if (config.params) {
      config.params = mapRequest(config.params)
    }

    return config
  },
  error => Promise.reject(error),
)

/**
 * 响应拦截器
 * 1. 判断业务 code
 * 2. 统一字段映射
 */
httpInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const body = res.data

    if (body.code === 0) {
      // ✅ 你说得完全对：直接映射整个 body
      return mapResponse(body)
    }

    return Promise.reject(new Error(body.message || '请求失败'))
  },
  error => Promise.reject(error),
)

export default httpInstance
