import { useMemo } from 'react'
import { useGoTo } from '@/hooks/use-go-to'
import styles from './WriterHeader.module.scss'

const WriterHeader = ({ writerHeader }: any) => {
  const { goTo } = useGoTo()

  const daysAsAuthor = useMemo(() => {
    if (!writerHeader?.writer?.become_author_at) return 0
    const begin = new Date(writerHeader.writer.become_author_at).getTime()
    const now = Date.now()
    return Math.max(Math.floor((now - begin) / (1000 * 60 * 60 * 24)), 0)
  }, [writerHeader])

  return (
    <div className={`${styles.bookindex_name} muye-author-home-page`}>
      <div className={styles.bookindex_wp}>
        <div className={styles.now_nav}>
          <span onClick={() => goTo('/home')}>首页</span>
          <b>/</b>
          <em>{writerHeader.writer.nickname}</em>
        </div>

        <div className={styles['author-message']}>
          <div className={styles.left}>
            <div className={styles.cover}>
              <img src={writerHeader.writer.avatar_url} alt="头像" />
            </div>

            <div className={styles.text}>
              <div className={styles.first}>
                <h1 className={styles.title}>{writerHeader.writer.nickname}</h1>
                <div className={styles.mark}>番茄签约作家</div>
              </div>
              <div className={styles.desc}>{writerHeader.writer.signature || '暂无签名'}</div>
            </div>
          </div>

          <div className={styles.middle} />

          <div className={styles.right}>
            <div className={styles.first}>
              <div>作品总字数</div>
              <div className={styles.bottom}>
                <span className={styles.big}>{writerHeader.writer.total_words?.toLocaleString() || 0}</span>
                <span className={styles.unit}>字</span>
              </div>
            </div>

            <div className={styles.second}>
              <div>粉丝数</div>
              <div className={styles.bottom}>
                <span className={styles.big}>{writerHeader.writer.follower_count?.toLocaleString() || 0}</span>
                <span className={styles.unit}>人</span>
              </div>
            </div>

            <div className={styles.third}>
              <div>创作天数</div>
              <div className={styles.bottom}>
                <span className={styles.big}>{daysAsAuthor}</span>
                <span className={styles.unit}>天</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriterHeader
