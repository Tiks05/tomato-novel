import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { UserInfo } from '@/types/auth/responses/user-info.types'
import type { LoginOrRegisterResponse } from '@/types/auth/responses/login-or-register-response.types'

interface UserState {
  user: UserInfo | null
  accessToken: string | null

  // ---------- Getters ----------
  id: () => number
  isLogin: () => boolean
  nickname: () => string
  role: () => UserInfo['role']
  isAdmin: () => boolean
  isAuthor: () => boolean
  daysAsAuthor: () => number
  avatar: () => string | undefined
  signature: () => string
  level: () => number
  authToken: () => string | null

  // ---------- Actions ----------
  setUser: (data: LoginOrRegisterResponse) => void
  updateUser: (partial: Partial<UserInfo>) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

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

      // 给 axios / request 拦截器用
      authToken: () => get().accessToken,

      // ---------- Actions ----------

      /**
       * 用于：登录 / 注册 / 刷新 token
       * 会整体替换 user + accessToken
       */
      setUser: data => {
        set({
          user: data.user,
          accessToken: data.access_token,
        })
      },

      /**
       * 用于：申请作家 / 修改资料 / 更新头像等
       * 只更新 user 的部分字段，不影响 token
       */
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
        })
      },
    }),
    {
      name: 'user-storage',
    },
  ),
)
