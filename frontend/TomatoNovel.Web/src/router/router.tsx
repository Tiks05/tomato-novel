// src/router/router.tsx
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

import { authRoutes } from './routes/auth.routes'
import { layoutRoutes } from './routes/layout.routes'
import { notFoundRoutes } from './routes/not-found.routes'

const router = createBrowserRouter([
  {
    path: '/',
    children: [{ index: true, element: <Navigate to="/home" replace /> }, ...authRoutes, ...notFoundRoutes, ...layoutRoutes],
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
