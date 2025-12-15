import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { mapRequest, mapResponse } from '@/utils/case.mapper'
import { useUserStore } from '@/store/use-user-store'

/**
 * 原始 axios 实例（只负责通信）
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

/**
 * 请求拦截器
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
 * 响应拦截器（运行时解包）
 */
axiosInstance.interceptors.response.use(
  res => {
    const body = res.data

    if (body.code === 0) {
      return mapResponse(body.data)
    }

    return Promise.reject(new Error(body.message || '请求失败'))
  },
  error => Promise.reject(error),
)

/**
 * 对外暴露的 request
 * 关键点：Promise<T>
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
