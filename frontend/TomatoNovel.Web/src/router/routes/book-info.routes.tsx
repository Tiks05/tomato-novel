import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// ===== 懒加载页面 =====
const BookInfoPage = lazy(() => import('@/pages/BookInfo/BookInfoPage'))
const ReaderPage = lazy(() => import('@/pages/BookInfo/components/ReaderContent'))

export const bookInfoRoutes: RouteObject[] = [
  {
    path: 'bookinfo/:id',
    element: <BookInfoPage />,
    handle: {
      title: '小说详情',
      requiresAuth: false,
    },
  },

  // /read/:bookId/:volumeId/:chapterId
  {
    path: 'read/:bookId/:volumeId/:chapterId',
    element: <ReaderPage />,
    handle: {
      title: '阅读章节',
      requiresAuth: false,
    },
  },
]
