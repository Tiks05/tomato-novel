import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// ===== 懒加载页面 =====

// workspace apply
const WorkspaceApplyPage = lazy(() => import('@/pages/WorkspaceApply/WorkspaceApplyPage'))

// writer root
const WorkspaceWriterPage = lazy(() => import('@/pages/WorkspaceWriter/WorkspaceWriterPage'))

// writer children
const AuthorSummaryPage = lazy(() => import('@/pages/WorkspaceWriter/components/AuthorSummary'))
const CreateBookPage = lazy(() => import('@/pages/WorkspaceWriter/components/CreateBook'))
const BookOverviewPage = lazy(() => import('@/pages/WorkspaceWriter/components/BookOverview'))
const UpdateBookPage = lazy(() => import('@/pages/WorkspaceWriter/components/UpdateBook'))
const ChapterManagePage = lazy(() => import('@/pages/WorkspaceWriter/components/ChapterManage'))
const NotificationCenterPage = lazy(() => import('@/pages/WorkspaceWriter/components/NotificationCenter'))

// independent writer pages
const CreateChapterPage = lazy(() => import('@/pages/WorkspaceWriter/components/CreateChapter'))
const UpdateChapterPage = lazy(() => import('@/pages/WorkspaceWriter/components/UpdateChapter'))

export const workspaceRoutes: RouteObject[] = [
  // ===== 申请作家 =====
  {
    path: 'workspace/apply',
    element: <WorkspaceApplyPage />,
    handle: {
      title: '申请作家',
      requiresAuth: true,
    },
  },

  // ===== 创建 / 编辑章节（非 writer 子路由）=====
  {
    path: 'workspace/writer/create-chapter/:bookId/:volumeId?',
    element: <CreateChapterPage />,
    handle: {
      title: '创建章节',
      requiresAuth: true,
    },
  },
  {
    path: 'workspace/writer/edit-chapter/:bookId/:chapterId',
    element: <UpdateChapterPage />,
    handle: {
      title: '编辑章节',
      requiresAuth: true,
    },
  },

  // ===== 作家工作台 =====
  {
    path: 'workspace/writer',
    element: <WorkspaceWriterPage />,
    handle: {
      title: '作家工作台',
      requiresAuth: true,
    },
    children: [
      {
        index: true,
        element: <AuthorSummaryPage />,
        handle: {
          title: '工作台首页',
        },
      },
      {
        path: 'create-book',
        element: <CreateBookPage />,
        handle: {
          title: '创建新书',
        },
      },
      {
        path: 'book-overview/:bookId',
        element: <BookOverviewPage />,
        handle: {
          title: '作品总览',
        },
      },
      {
        path: 'update-book/:bookId',
        element: <UpdateBookPage />,
        handle: {
          title: '修改书籍',
        },
      },
      {
        path: 'manage-chapter/:bookId',
        element: <ChapterManagePage />,
        handle: {
          title: '章节管理',
        },
      },
      {
        path: 'notifications',
        element: <NotificationCenterPage />,
        handle: {
          title: '消息通知',
        },
      },
    ],
  },
]
