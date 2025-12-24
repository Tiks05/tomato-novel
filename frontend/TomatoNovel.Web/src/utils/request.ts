import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { mapRequest, mapResponse } from '@/utils/case.mapper'
import { useUserStore } from '@/store/use-user-store'
import { refreshAccessToken } from '@/utils/oauth'

/**
 * 业务 axios（走 /api + 业务解包）
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

/**
 * refresh 并发控制
 */
let isRefreshing = false
let refreshPromise: Promise<string> | null = null

/**
 * 请求拦截器：自动带 token
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
 * 响应拦截器：业务解包 + 自动 refresh
 */
axiosInstance.interceptors.response.use(
  res => {
    const body = res.data

    // 业务成功
    if (body?.code === 0) {
      return mapResponse(body.data)
    }

    // 业务失败（非 401）
    if (body?.code) {
      return Promise.reject(new Error(body.message || '请求失败'))
    }

    return res.data
  },
  async error => {
    const { response, config } = error

    // 非 401，直接抛
    if (!response || response.status !== 401) {
      return Promise.reject(error)
    }

    // 防止 refresh 死循环
    if (config._retry) {
      useUserStore.getState().logout()
      return Promise.reject(error)
    }

    config._retry = true

    try {
      if (!isRefreshing) {
        isRefreshing = true

        refreshPromise = (async () => {
          const store = useUserStore.getState()
          const refreshToken = store.refreshTokenValue()

          if (!refreshToken) {
            throw new Error('No refresh token')
          }

          const tokenData = await refreshAccessToken(refreshToken)

          store.setTokens({
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            expiresIn: tokenData.expires_in,
          })

          return tokenData.access_token
        })().finally(() => {
          isRefreshing = false
        })
      }

      const newAccessToken = await refreshPromise!

      // 重放原请求
      config.headers.Authorization = `Bearer ${newAccessToken}`
      return axiosInstance(config)
    } catch (e) {
      useUserStore.getState().logout()
      return Promise.reject(e)
    }
  },
)

/**
 * 对外 request（业务层永远用这个）
 */
const request = {
  get<T>(url: string, config?: any): Promise<T> {
    return axiosInstance.get(url, config)
  },
  post<T>(url: string, data?: any, config?: any): Promise<T> {
    return axiosInstance.post(url, data, config)
  },
  put<T>(url: string, data?: any, config?: any): Promise<T> {
    return axiosInstance.put(url, data, config)
  },
  delete<T>(url: string, config?: any): Promise<T> {
    return axiosInstance.delete(url, config)
  },
}

export default request
