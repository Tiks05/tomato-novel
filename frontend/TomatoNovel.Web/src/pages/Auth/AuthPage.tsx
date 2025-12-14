import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useGoTo } from '@/hooks/use-go-to'
import logoImg from '@/assets/icons/logo/icons8-firebase-undefined-32.png'
import posterImg from '@/assets/images/auth/welcome.webp'
import videoSrc from '@/assets/movies/auth/welcome.webm'
import styles from './AuthPage.module.scss'

const LoginPage = () => {
  const { goTo } = useGoTo()

  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handler = () => setVideoLoaded(true)
    video.addEventListener('canplaythrough', handler)

    return () => video.removeEventListener('canplaythrough', handler)
  }, [])

  return (
    <div className={styles['page-container']}>
      {/* 顶部导航 */}
      <div className={styles['top-nav']}>
        <div className={styles['nav-left']} onClick={() => goTo('/home')}>
          <img src={logoImg} className={styles['nav-logo']} />
          番茄小说网
          <span className={styles['divider']}>|</span>
          <span
            className={styles['nav-item-left']}
            onClick={e => {
              e.stopPropagation()
              goTo('/writer')
            }}
          >
            作家专区
          </span>
        </div>

        <div className={styles['nav-right']}>
          <span className={styles['nav-item-right']} onClick={() => goTo('/home')}>
            游客登录
          </span>
          <span className={styles['nav-item-right']} onClick={() => goTo('/benefit')}>
            作家福利
          </span>
        </div>
      </div>

      {/* 页面内容 */}
      <div className={styles['login-page']}>
        {/* 懒加载封面 */}
        {!videoLoaded && <img className={styles['video-placeholder']} src={posterImg} alt="背景加载中..." />}

        {/* 背景视频 */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles['bg-video']}
          style={{ display: videoLoaded ? 'block' : 'none' }}
        >
          <source src={videoSrc} type="video/webm" />
        </video>

        {/* 遮罩 */}
        <div className={styles['overlay']}></div>

        {/* 登录表单 */}
        <div className={styles['login-panel']}>
          <div className={styles['login-box']}>
            <Outlet />
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <div className={styles['footer-text']}>©2025 番茄小说网 | 本系统仅供学习与教学使用</div>
    </div>
  )
}

export default LoginPage
