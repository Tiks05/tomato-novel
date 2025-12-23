import { useEffect, useState } from 'react'
import { useGoTo } from '@/hooks/use-go-to'
import styles from './Notice.module.scss'

// 统一 api 出口
import { getNewsList } from '@/api/workspace.api'

const Notice = () => {
  const { goTo } = useGoTo()

  const [newslist, setNewslist] = useState<any[]>([])

  const fetchNewsList = async () => {
    const res = await getNewsList()
    setNewslist(res.items)
  }

  useEffect(() => {
    fetchNewsList()
  }, [])

  return (
    <div className={styles['home-activity']}>
      <div className={styles['serial-card']}>
        {/* 标题 */}
        <div className={styles['home-activity-title']}>
          <h4>公告</h4>

          <span className={styles['author-title-extra']}>
            <span className={styles['home-activity-title-more']}>
              查看全部
              <svg
                className={`${styles['serial-icon']} ${styles['serial-icon-general_arrow_circle']} ${styles['label-icon']}`}
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M14.7071 10.359C14.3166 9.96849 13.6835 9.96849 13.2929 10.359C12.9024 10.7495 12.9024 11.3827 13.2929 11.7732L17.5356 16.0159L13.2929 20.2585C12.9024 20.649 12.9024 21.2822 13.2929 21.6727C13.6835 22.0632 14.3166 22.0632 14.7071 21.6727L19.6569 16.723C20.0474 16.3325 20.0474 15.6993 19.6569 15.3088L14.7071 10.359Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16Z"
                />
              </svg>
            </span>
          </span>
        </div>

        {/* 列表 */}
        <div className={styles.list}>
          {newslist.map((item, i) => (
            <div key={i} className={styles.item} onClick={() => goTo(item.path)}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notice
