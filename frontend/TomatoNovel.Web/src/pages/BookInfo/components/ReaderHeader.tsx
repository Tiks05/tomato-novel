import { useRef, useState } from 'react'

import { useGoTo } from '@/hooks/use-go-to'
import {} from '@/api/book-info.api'

// ⚠️ 这里假设你 React 侧已有等价的 user store hook
import { useUserStore } from '@/store/use-user-store'

import styles from './ReaderHeader.module.scss'

const ReaderHeader = ({ bookTitle, bookId }: any) => {
  const { goTo } = useGoTo()
  const userStore = useUserStore()

  // dropdown 控制
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const timerRef = useRef<number | null>(null)

  const showDropdown = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setDropdownVisible(true)
  }

  const hideDropdown = () => {
    timerRef.current = window.setTimeout(() => {
      setDropdownVisible(false)
    }, 300)
  }

  const handleLogout = () => {
    userStore.logout()
    goTo('/login')
  }

  // 用户名显示逻辑（等价 computed）
  const displayName = (() => {
    if (userStore.user?.nickname?.trim()) return userStore.user.nickname
    return userStore.user?.id?.toString().slice(0, 3) || '用户'
  })()

  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        {/* LOGO + 书名 */}
        <div className={styles.logo} onClick={() => goTo(`/bookinfo/${bookId}`)}>
          <svg
            className="muyeicon-icon muyeicon-icon-reader-icon-back"
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: '2px 8px 2px 0px', verticalAlign: 'top' }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.2997 18.978C10.5861 19.2658 10.5824 19.7316 10.2914 20.0148C10.0126 20.2863 9.56952 20.2904 9.28556 20.0243L1.27097 12.5125C0.907127 12.1403 0.907127 11.5368 1.27097 11.1646L9.28205 3.48947C9.56705 3.21642 10.0171 3.2182 10.2999 3.49349C10.5881 3.77396 10.5963 4.23423 10.3185 4.52485L3.32031 11.8437C3.32031 11.8437 7.32726 15.9898 10.2997 18.978Z"
            />
          </svg>
          <span className={styles['logo-text']}>{bookTitle}</span>
        </div>

        {/* 右侧 */}
        <div className={styles.right}>
          {/* 未登录 */}
          {!userStore.isLogin && (
            <div className={styles['auth-links']}>
              <span className={styles['auth-link']} onClick={() => goTo('/login')}>
                登录
              </span>
            </div>
          )}

          {/* 已登录 */}
          {userStore.isLogin() && (
            <div className={styles['auth-dropdown']} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
              <div className={styles['auth-avatar']}>
                <img src={userStore.user?.avatar} className={styles.avatar} />
                <span className={styles['auth-username']}>{displayName}</span>
              </div>

              {dropdownVisible && (
                <div className={styles['dropdown-panel']}>
                  <div className={styles['dropdown-item']} onClick={() => goTo('/profile')}>
                    <img
                      src="/src/assets/icons/update/icons8-update-windows-11-outline-32.png"
                      className={styles['dropdown-icon']}
                    />
                    <span>修改信息</span>
                  </div>

                  <div className={styles['dropdown-item']} onClick={handleLogout}>
                    <img
                      src="/src/assets/icons/logout/icons8-logout-windows-11-filled-32.png"
                      className={styles['dropdown-icon']}
                    />
                    <span>退出登录</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default ReaderHeader
