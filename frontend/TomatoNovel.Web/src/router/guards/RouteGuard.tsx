import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useUserStore } from '@/store/use-user-store'

interface RouteGuardProps {
  children: ReactNode
  requireAuthor?: boolean
}

export function RouteGuard({ children, requireAuthor }: RouteGuardProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isLoggedIn = useUserStore(state => state.isLogin())
  const isAuthor = useUserStore(state => state.isAuthor())

  useEffect(() => {
    if (!isLoggedIn) {
      message.warning('请先登录')
      navigate('/auth', {
        replace: true,
        state: { from: location.pathname },
      })
      return
    }

    if (requireAuthor && !isAuthor) {
      message.warning('请先申请成为作者')
      navigate('/workspace/apply', { replace: true })
    }
  }, [isLoggedIn, requireAuthor, isAuthor, navigate, location.pathname])

  if (!isLoggedIn) return null
  if (requireAuthor && !isAuthor) return null

  return <>{children}</>
}
