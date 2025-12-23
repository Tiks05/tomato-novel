import { useEffect, useState } from 'react'

import { useGoTo } from '@/hooks/use-go-to'
import { getActiveList } from '@/api/workspace.api'

import styles from './Active.module.scss'

const Active = () => {
  const { goTo } = useGoTo()
  const [activeList, setActiveList] = useState<any[]>([])

  const fetchActives = async () => {
    const res: any = await getActiveList(3)
    if (res) {
      setActiveList(res.items)
    }
  }

  useEffect(() => {
    fetchActives()
  }, [])

  return (
    <div className={styles.homeActivity}>
      <div className={styles.serialCard}>
        <div className={styles.homeActivityTitle}>
          <h4>创作活动</h4>

          <span className={styles.authorTitleExtra}>
            <span className={styles.homeActivityTitleMore}>
              查看全部
              <svg
                className={`${styles.serialIcon} ${styles.labelIcon}`}
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
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

        {activeList.map((item, i) => (
          <div key={i} className={styles.homeActivityCard} onClick={() => goTo(item.path)}>
            <div className={styles.cardImg}>
              <img src={item.notice_url} alt="cover" />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardContentTitle}>{item.title}</div>
              <div className={styles.cardContentDate}>活动时间：{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Active
