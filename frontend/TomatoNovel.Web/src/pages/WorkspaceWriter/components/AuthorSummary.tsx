import { useEffect, useMemo, useState } from 'react'

import { useUserStore } from '@/store/use-user-store'
import { getUserStats } from '@/api/workspace.api'

import BookSummary from '@/pages/WorkspaceWriter/components/BookSummary'
import Calendar from '@/pages/WorkspaceWriter/components/Calendar'
import HotKeywordRank from '@/pages/WorkspaceWriter/components/HotKeywordRank'
import Active from '@/pages/WorkspaceWriter/components/Active'
import Notice from '@/pages/WorkspaceWriter/components/Notice'
import EditorRecommend from '@/pages/WorkspaceWriter/components/EditorRecommend'
import NewBookRanking from '@/pages/WorkspaceWriter/components/NewBookRanking'
import FooterCopyright from '@/pages/WorkspaceWriter/components/FooterCopyright'

import styles from './AuthorSummary.module.scss'

const AuthorSummary = () => {
  const userStore = useUserStore()

  /* ========= 从 store 中一次性取“值” ========= */
  const userId = userStore.id()
  const isLogin = userStore.isLogin()
  const isAuthor = userStore.isAuthor()
  const nickname = userStore.nickname()
  const level = userStore.level()
  const daysAsAuthor = userStore.daysAsAuthor()

  /* ========= 用户统计 ========= */
  const [stats, setStats] = useState({
    fans_count: 0,
    total_words: 0,
  })

  useEffect(() => {
    if (!userId) return

    const fetchStats = async () => {
      try {
        const res: any = await getUserStats(userId)
        if (res) {
          setStats(res)
        }
      } catch (e) {
        console.error('获取用户统计信息失败:', e)
      }
    }

    fetchStats()
  }, [userId])

  /* ========= 问候语 ========= */
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return '早上好'
    if (hour < 18) return '下午好'
    return '晚上好'
  }

  const greetingText = useMemo(() => {
    if (isLogin) {
      return `${getGreeting()}，${nickname || '用户'}`
    }
    return '请登录'
  }, [isLogin, nickname])

  const greetingDescHtml = useMemo(() => {
    if (isLogin && isAuthor) {
      return `今天是番茄陪你的第 <b class="highlight">${daysAsAuthor}</b> 天，努力加油码字吧`
    }
    return '欢迎来到番茄作家专区，快来开启创作吧！'
  }, [isLogin, isAuthor, daysAsAuthor])

  /* ========= 图片 ========= */
  const greetingImg = useMemo(() => '/src/assets/images/workspace/writer/afternoon.gif', [])

  const levelImg = useMemo(() => '/src/assets/images/workspace/writer/lvx.png', [])

  return (
    <div className={styles.tower_con}>
      <div className={styles.serialCard}>
        <div className={styles.homeDisplay}>
          <img width={70} height={70} className={styles.homeDisplayImg} src={greetingImg} alt="" />

          <div className={styles.homeDisplayDesc}>
            <div className={`${styles.descAuthor} font-1`}>
              {greetingText}

              <div className={styles.homeDisplayDescMedal}>
                <div className={styles.homeDisplayDescMedalLevel}>
                  <div
                    className={styles.homeDisplayDescMedalLevelName}
                    style={{
                      background: 'rgb(238, 230, 245)',
                      color: 'rgb(106, 93, 112)',
                    }}
                  >
                    <span style={{ opacity: 0.8 }}>Lv.{level}</span>
                  </div>
                  <img src={levelImg} alt="" />
                </div>
              </div>
            </div>

            <div className={`${styles.descDay} font-2`} dangerouslySetInnerHTML={{ __html: greetingDescHtml }} />
          </div>

          <div className={`${styles.homeDisplayDetail} ${styles.homeDisplayFansnum}`}>
            <div className={`${styles.detailLabel} font-4`}>
              粉丝数
              <span className="icon-circle-info tomato-circle-info" />
            </div>
            <div className={`${styles.detailCount} font-1`}>{stats.fans_count || 0}</div>
          </div>

          <div className={`${styles.homeDisplayDetail} ${styles.homeDisplayWordnum}`}>
            <div className={`${styles.detailLabel} font-4`}>
              累计创作字数
              <span className="icon-circle-info tomato-circle-info" />
            </div>
            <div className={`${styles.detailCount} font-1`}>{stats.total_words || 0}</div>
          </div>
        </div>
      </div>

      {/* 小说 / 短故事 */}
      <BookSummary />

      <div className={styles.towerWp}>
        <div className={styles.towerLeft}>
          <Calendar />
          <HotKeywordRank />
        </div>
        <div className={styles.towerRight}>
          <Active />
          <Notice />
          <EditorRecommend />
          <NewBookRanking />
        </div>
      </div>

      <FooterCopyright />
    </div>
  )
}

export default AuthorSummary
