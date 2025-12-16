import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// ===== 懒加载页面 =====
const WriterInfoPage = lazy(() => import('@/pages/WriterInfo/WriterInfoPage'))

export const writerInfoRoutes: RouteObject[] = [
  {
    path: 'writerinfo/:id',
    element: <WriterInfoPage />,
    handle: {
      title: '作家详情',
      requiresAuth: false,
    },
  },
]
