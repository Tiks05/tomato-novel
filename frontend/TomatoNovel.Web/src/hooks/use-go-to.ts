import { useLocation, useNavigate } from 'react-router-dom'

export function useGoTo() {
  const navigate = useNavigate()
  const location = useLocation()

  /**
   * 页面跳转封装函数
   * @param path 路径，例如 '/login'
   * @param replace 是否使用 replace 模式（替代当前历史记录）
   */
  const goTo = (path: string, replace = false) => {
    // 避免重复跳转
    if (location.pathname === path) return

    navigate(path, { replace })
  }

  return {
    goTo,
  }
}
