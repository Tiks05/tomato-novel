import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { LoginOrRegisterResponse } from '@/types/auth/responses/login-or-register-response.types'

interface UserState {
  user: LoginOrRegisterResponse | null

  // ---------- Token ----------
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null

  // ---------- Getters ----------
  id: () => number
  isLogin: () => boolean
  nickname: () => string
  role: () => LoginOrRegisterResponse['role']
  isAdmin: () => boolean
  isAuthor: () => boolean
  daysAsAuthor: () => number
  avatar: () => string | undefined
  signature: () => string
  level: () => number

  // 给 request.ts 用
  authToken: () => string | null
  refreshTokenValue: () => string | null
  isTokenExpired: () => boolean

  // ---------- Actions ----------
  setUser: (user: LoginOrRegisterResponse) => void
  setTokens: (payload: { accessToken: string; refreshToken: string; expiresIn: number }) => void
  updateUser: (partial: Partial<LoginOrRegisterResponse>) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      // ---------- Token ----------
      accessToken: null,
      refreshToken: null,
      expiresAt: null,

      // ---------- Getters ----------
      id: () => get().user?.id ?? 0,
      isLogin: () => !!get().user && !!get().accessToken,
      nickname: () => get().user?.nickname ?? '',
      role: () => get().user?.role ?? 'guest',
      isAdmin: () => get().user?.role === 'admin',
      isAuthor: () => get().user?.role === 'author',

      daysAsAuthor: () => {
        const at = get().user?.become_author_at
        if (!at) return 0
        const begin = new Date(at).getTime()
        const now = Date.now()
        return Math.ceil((now - begin) / (1000 * 60 * 60 * 24))
      },

      avatar: () => get().user?.avatar,
      signature: () => get().user?.signature ?? '',
      level: () => get().user?.level ?? 0,

      // ---------- Token helpers ----------
      authToken: () => get().accessToken,
      refreshTokenValue: () => get().refreshToken,

      isTokenExpired: () => {
        const expiresAt = get().expiresAt
        if (!expiresAt) return true
        // 提前 60 秒视为过期
        return Date.now() >= expiresAt - 60_000
      },

      // ---------- Actions ----------

      /**
       * 业务登录成功后设置用户信息
       */
      setUser: user => {
        set({ user })
      },

      /**
       * OAuth 登录 / refresh 时调用
       */
      setTokens: ({ accessToken, refreshToken, expiresIn }) => {
        set({
          accessToken,
          refreshToken,
          expiresAt: Date.now() + expiresIn * 1000,
        })
      },

      updateUser: partial => {
        const currentUser = get().user
        if (!currentUser) return

        set({
          user: {
            ...currentUser,
            ...partial,
          },
        })
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
        })
      },
    }),
    {
      name: 'user-storage',
    },
  ),
)
