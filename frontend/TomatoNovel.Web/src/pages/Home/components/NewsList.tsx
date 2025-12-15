import { useEffect, useState } from 'react'
import styles from './NewsList.module.scss'

import { fetchNewsList } from '@/api/home.api'
import { useGoTo } from '@/hooks/use-go-to'

const NewsList = () => {
  const [newslist, setNewslist] = useState<any[]>([])
  const { goTo } = useGoTo()

  useEffect(() => {
    const loadNews = async () => {
      const limit = 8
      const res = await fetchNewsList({ limit })
      setNewslist(res)
    }

    loadNews()
  }, [])

  return (
    <div className={styles.news_wrapper}>
      <div className={styles.news_tit}>
        <h2>最新资讯</h2>
      </div>

      <div className={styles.list}>
        {newslist.map((item, i) => (
          <div key={i} className={styles.item} onClick={() => goTo(item.path)}>
            <p>{item.title}</p>
            <span></span>
          </div>
        ))}

        <div className={styles.more}>更多</div>
      </div>
    </div>
  )
}

export default NewsList
