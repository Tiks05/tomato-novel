// src/router/routes/not-found.routes.tsx

import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'))

export const notFoundRoutes: RouteObject[] = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
