import { useEffect, useMemo, useRef, useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

import { useUserStore } from '@/store/use-user-store'
import { useGoTo } from '@/hooks/use-go-to'

import styles from './Header.module.scss'

import logo from '@/assets/icons/logo/icons8-firebase-undefined-32.png'
import defaultAvatar from '@/assets/icons/Profile/icons8-user-pulsar-color-32.png'
import iconUpdate from '@/assets/icons/update/icons8-update-windows-11-outline-32.png'
import iconLogout from '@/assets/icons/logout/icons8-logout-windows-11-filled-32.png'

type MenuItem = {
  path: string
  label: string
}

type HeaderProps = {
  menus: MenuItem[]
}

const Header = ({ menus }: HeaderProps) => {
  const { goTo } = useGoTo()
  const location = useLocation()
  const userStore = useUserStore()

  const [searchText, setSearchText] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const timerRef = useRef<number | null>(null)

  /** 是否激活 */
  const isActive = (path: string) => location.pathname === path

  /** 显示用户名（等价 computed） */
  const displayName = useMemo(() => {
    if (userStore.user?.nickname?.trim()) return userStore.user.nickname
    return userStore.user?.id?.toString().slice(0, 3) || '用户'
  }, [userStore.user])

  /** 退出登录 */
  const handleLogout = () => {
    userStore.logout()
    goTo('/login')
  }

  /** 搜索 */
  const handleSearch = () => {
    const keyword = searchText.trim()
    if (!keyword) return
    goTo(`/search?keyword=${encodeURIComponent(keyword)}`)
  }

  /** 下拉显示 / 隐藏（等价 Vue timer） */
  const showDropdown = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDropdownVisible(true)
  }

  const hideDropdown = () => {
    timerRef.current = window.setTimeout(() => {
      setDropdownVisible(false)
    }, 300)
  }

  /** 滚动监听 */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles['header-inner']}>
        {/* 左侧 Logo */}
        <div className={`${styles['header-left']} ${styles.clickable}`} onClick={() => goTo('/home')}>
          <img src={logo} className={styles['nav-logo']} />
          <span className={styles['logo-text']}>番茄小说网</span>
        </div>

        {/* 中间导航 */}
        <nav className={styles['nav-list']}>
          {menus.map(item => (
            <span
              key={item.path}
              className={`${styles['nav-item']} ${isActive(item.path) ? styles.active : ''}`}
              onClick={() => goTo(item.path)}
            >
              {item.label}
            </span>
          ))}
        </nav>

        {/* 右侧区域 */}
        <div className={styles['header-right']}>
          <Input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            placeholder="请输入书名或作者名"
            allowClear
            className={`${styles['search-input']} ${isScrolled ? styles['scrolled-input'] : ''}`}
            suffix={<SearchOutlined />}
          />

          <span className={styles.divider}>|</span>

          {!userStore.user ? (
            <div className={styles['auth-links']}>
              <span className={styles['auth-link']} onClick={() => goTo('/login')}>
                登录
              </span>
              <span className={styles['auth-link']} onClick={() => goTo('/login')}>
                注册
              </span>
            </div>
          ) : (
            <div className={styles['auth-dropdown']} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
              <div className={styles['auth-avatar']}>
                <img src={userStore.user.avatar || defaultAvatar} className={styles.avatar} />
                <span className={styles['auth-username']}>{displayName}</span>
              </div>

              {dropdownVisible && (
                <div className={styles['dropdown-panel']}>
                  <div className={styles['dropdown-item']} onClick={() => goTo('/profile')}>
                    <img src={iconUpdate} className={styles['dropdown-icon']} />
                    <span>修改信息</span>
                  </div>

                  <div className={styles['dropdown-item']} onClick={handleLogout}>
                    <img src={iconLogout} className={styles['dropdown-icon']} />
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

export default Header
