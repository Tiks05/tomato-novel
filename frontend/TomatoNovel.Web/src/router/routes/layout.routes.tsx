import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// ===== 懒加载页面 =====
const HomePage = lazy(() => import('@/pages/Home/HomePage'))
// const LibraryPage = lazy(() => import('@/pages/Library/LibraryPage'))
// const WriterPage = lazy(() => import('@/pages/Writer/WriterPage'))
// const ProfilePage = lazy(() => import('@/components/layout/Profile'))
// const SearchPage = lazy(() => import('@/components/layout/Search'))

export const layoutRoutes: RouteObject[] = [
  // /home
  {
    path: 'home',
    element: <HomePage />,
    handle: {
      title: '首页',
      requiresAuth: false,
    },
  },

  // // /library
  // {
  //   path: 'library',
  //   element: <LibraryPage />,
  //   handle: {
  //     title: '书库',
  //     requiresAuth: false,
  //   },
  // },

  // // /writer
  // {
  //   path: 'writer',
  //   element: <WriterPage />,
  //   handle: {
  //     title: '作家首页',
  //     requiresAuth: false,
  //   },
  // },

  // // /profile（需要登录）
  // {
  //   path: 'profile',
  //   element: <ProfilePage />,
  //   handle: {
  //     title: '个人信息',
  //     requiresAuth: true,
  //   },
  // },

  // // /search
  // {
  //   path: 'search',
  //   element: <SearchPage />,
  //   handle: {
  //     title: '搜索结果页',
  //     requiresAuth: false,
  //   },
  // },
]
