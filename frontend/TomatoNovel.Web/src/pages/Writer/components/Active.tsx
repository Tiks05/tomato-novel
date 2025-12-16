import { useEffect, useMemo, useState } from 'react'

import { useGoTo } from '@/hooks/use-go-to'
import { useUserStore } from '@/store/use-user-store'
import { getNewsList } from '@/api/writer.api'

import type { WriterActiveResponse } from '@/types/writer/responses/writer-active-response.types'
import type { WriterNoticeResponse } from '@/types/writer/responses/writer-notice-response.types'
import type { WriterPicNoticeResponse } from '@/types/writer/responses/writer-pic-notice-response.types'

import styles from './Active.module.scss'

const Active = () => {
  const { goTo } = useGoTo()
  const userStore = useUserStore()

  // ✅ 关键：显式声明 state 泛型，避免 never[]
  const [noticelist, setNoticelist] = useState<{
    picnotice: WriterPicNoticeResponse[]
    notice: WriterNoticeResponse[]
    active: WriterActiveResponse[]
  }>({
    picnotice: [],
    notice: [],
    active: [],
  })

  const defaultAvatar = new URL('@/assets/images/writer/active/not-login.png', import.meta.url).href

  const iconTit1 = new URL('@/assets/images/writer/active/tit-1.png', import.meta.url).href

  const arrowRight = new URL('@/assets/icons/arrow-right/icons8-arrow-100.png', import.meta.url).href

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return '早上好'
    if (hour < 18) return '下午好'
    return '晚上好'
  }

  const displayAvatar = useMemo(() => {
    if (userStore.isLogin()) {
      return userStore.user?.avatar || defaultAvatar
    }
    return defaultAvatar
  }, [userStore, defaultAvatar])

  const greetingText = useMemo(() => {
    if (userStore.isLogin()) {
      const nickname = userStore.user?.nickname || '用户'
      return `${getGreeting()}，${nickname}`
    }
    return '请登录'
  }, [userStore])

  const greetingDescHtml = useMemo(() => {
    if (userStore.isLogin() && userStore.isAuthor()) {
      return `今天是你在番茄创作的第 <b class="highlight">${userStore.daysAsAuthor}</b> 天`
    }
    return '欢迎成为番茄作家'
  }, [userStore])

  const fetchAllNotices = async () => {
    const [picList, noticeList, activeList] = await Promise.all([
      getNewsList({ type: 'picnotice', limit: 2 }) as Promise<WriterPicNoticeResponse[]>,
      getNewsList({ type: 'notice', limit: 6 }) as Promise<WriterNoticeResponse[]>,
      getNewsList({ type: 'active', limit: 2 }) as Promise<WriterActiveResponse[]>,
    ])

    setNoticelist({
      picnotice: picList ?? [],
      notice: noticeList ?? [],
      active: activeList ?? [],
    })
  }

  useEffect(() => {
    fetchAllNotices()
  }, [])

  return (
    <div className={styles.author_active}>
      {/* 用户卡片 */}
      <div className={styles.user_card}>
        <div className={styles['user-card-left']}>
          <img src={displayAvatar} className={styles['user-card-left-avatar']} />

          <div className={styles['user-card-left-text']}>
            <div className={styles['user-card-left-text-hello']}>{greetingText}</div>
            <div
              className={styles['user-card-left-text-title']}
              dangerouslySetInnerHTML={{ __html: greetingDescHtml }}
            />
          </div>
        </div>

        <div className={styles['user-card-right']}>
          {!userStore.isLogin() && (
            <span className={styles.btn1} onClick={() => goTo('/login')}>
              立即登录
            </span>
          )}

          {userStore.isLogin() && (
            <span
              className={styles.btn1}
              onClick={() => goTo(userStore.isAuthor() ? '/workspace/writer' : '/workspace')}
            >
              工作台
            </span>
          )}

          <span onClick={() => goTo('/benefit')}>作家福利</span>
        </div>
      </div>

      {/* 公告 + 活动 */}
      <div className={styles['home-list']}>
        {/* 公告 */}
        <div className={styles['home-notice']}>
          <div className={styles['home-notice-left']}>
            <div className={styles.author_list_title}>公告</div>
            <img src={iconTit1} className={styles.author_list_title_icon} />
          </div>

          <div className={styles['home-notice-right']}>
            <div className={styles['home-notice-right-have-picture']}>
              {noticelist.picnotice.map((item, i) => (
                <div
                  key={i}
                  className={styles['home-notice-right-have-picture-list-item']}
                  onClick={() => goTo(item.path)}
                >
                  <div className={styles['home-notice-right-have-picture-list-item-img']}>
                    <img src={item.cover_url} />
                  </div>
                  <div className={styles['home-notice-right-have-picture-list-item-title']}>{item.title}</div>
                </div>
              ))}
            </div>

            <div className={styles['home-notice-right-no-picture']}>
              {noticelist.notice.map((item, i) => (
                <div
                  key={i}
                  className={styles['home-notice-right-no-picture-list-item']}
                  onClick={() => goTo(item.path)}
                >
                  <div className={styles['home-notice-right-no-picture-list-item-content']}>
                    <div className={styles['home-notice-right-no-picture-list-item-content-title']}>{item.title}</div>
                    <img src={arrowRight} />
                  </div>
                  <div className={styles.line} />
                </div>
              ))}
            </div>

            <div className={styles.author_list_more} style={{ backgroundImage: `url(${arrowRight})` }}>
              <span>更多</span>
            </div>
          </div>
        </div>

        {/* 活动 */}
        <div className={styles['home-activity']}>
          <div className={styles['home-activity-left']}>
            <div className={styles.author_list_title}>创作活动</div>
            <img src={iconTit1} className={styles.author_list_title_icon} />
          </div>

          <div className={styles['home-activity-right']}>
            <div className={styles['home-activity-right-list']}>
              {noticelist.active.map((item, i) => (
                <div key={i} className={styles['home-activity-right-list-item']} onClick={() => goTo(item.path)}>
                  <div className={styles['home-activity-right-list-item-img']}>
                    <img src={item.cover_url} />
                  </div>
                  <div className={styles['home-activity-right-list-item-text']}>
                    <div className={styles['home-activity-right-list-item-text-title']}>{item.title}</div>
                    <div className={styles['home-activity-right-list-item-text-startime']}>{item.updated_at}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.author_list_more} style={{ backgroundImage: `url(${arrowRight})` }}>
              <span>更多</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Active
