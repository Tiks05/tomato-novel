// src/router/router.tsx
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

import { authRoutes } from './routes/auth.routes'
import { notFoundRoutes } from './routes/not-found.routes'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Navigate to="/login" replace /> },

      ...authRoutes,
      ...notFoundRoutes,
    ],
  },
])

export default function Router() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', marginTop: '20vh' }}>
          <Spin size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  )
}
