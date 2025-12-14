import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// ===== 懒加载组件 =====
const AuthPage = lazy(() => import('@/pages/Auth/AuthPage'))
const LoginSmsForm = lazy(() => import('@/pages/Auth/components/LoginSmsForm'))
const LoginPwdForm = lazy(() => import('@/pages/Auth/components/LoginPwdForm'))
const ResetPwdForm = lazy(() => import('@/pages/Auth/components/ResetPwdForm'))

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <AuthPage />,
    handle: {
      title: '登录',
      requiresAuth: false,
    },
    children: [
      {
        index: true,
        element: <LoginSmsForm />,
        handle: { title: '验证码登录' },
      },
      {
        path: 'sms',
        element: <LoginSmsForm />,
        handle: { title: '验证码登录' },
      },
      {
        path: 'pwd',
        element: <LoginPwdForm />,
        handle: { title: '密码登录' },
      },
      {
        path: 'reset',
        element: <ResetPwdForm />,
        handle: { title: '重置密码' },
      },
    ],
  },
]
