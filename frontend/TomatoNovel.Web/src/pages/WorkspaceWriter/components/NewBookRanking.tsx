import { useEffect, useMemo, useState } from 'react'
import { useGoTo } from '@/hooks/use-go-to'
import styles from './NewBookRanking.module.scss'

// 统一出口（不在本组件中直接定义类型）
import { getBookRank } from '@/api/workspace.api'

const NewBookRanking = () => {
  const { goTo } = useGoTo()

  const [readerType, setReaderType] = useState<'男生' | '女生'>('男生')
  const categoryList = ['西方奇幻', '东方仙侠']
  const [activeCategory, setActiveCategory] = useState(categoryList[0])

  // 所有榜单缓存
  const [allRankMap, setAllRankMap] = useState<Record<string, any[]>>({})

  // 当前展示榜单
  const currentList = useMemo(() => {
    const key = `${readerType}-${activeCategory}`
    return allRankMap[key] || []
  }, [readerType, activeCategory, allRankMap])

  // 一次性加载所有榜单
  const fetchAllRanks = async () => {
    const map: Record<string, any[]> = {}

    for (const gender of ['男生', '女生']) {
      for (const category of categoryList) {
        const res = await getBookRank(gender as '男生' | '女生', category)
        map[`${gender}-${category}`] = res.child
      }
    }

    setAllRankMap(map)
  }

  // 昨日日期
  const yesterdayDate = useMemo(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const mm = String(yesterday.getMonth() + 1).padStart(2, '0')
    const dd = String(yesterday.getDate()).padStart(2, '0')
    return `${mm}-${dd}`
  }, [])

  useEffect(() => {
    fetchAllRanks()
  }, [])

  return (
    <div className={styles['home-activity']}>
      <div className={styles['serial-card']}>
        {/* title */}
        <div className={styles['home-activity-title']}>
          <h4>
            原创新书榜
            <em>统计时间：{yesterdayDate} 24:00</em>
          </h4>

          <span className={styles['author-title-extra']}>
            <span className={styles['home-activity-title-more']}>查看全部</span>
          </span>
        </div>

        {/* 分类与频道切换 */}
        <div className={styles['word-list-switch']}>
          <div className={styles['down_btn']}>
            <span>{activeCategory}</span>
            <img src="/src/assets/images/workspace/writer/x.png" alt="" />

            <div className={styles['down_link']}>
              {categoryList.map((cat, i) => (
                <em key={i} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </em>
              ))}
            </div>
          </div>

          <div className={styles['word-list-switch-type']}>
            <span className={readerType === '男生' ? styles.active : ''} onClick={() => setReaderType('男生')}>
              男频
            </span>
            <span className={readerType === '女生' ? styles.active : ''} onClick={() => setReaderType('女生')}>
              女频
            </span>
          </div>
        </div>

        {/* 榜单内容 */}
        <div className={styles['home-new-book-list']}>
          {currentList.map((item: any, i: number) => (
            <div key={i} className={styles['hot-card']} onClick={() => goTo(item.path)}>
              <div
                className={`${styles['hot-card-rank']} ${
                  i === 0
                    ? styles['hot-card-rank-gold1']
                    : i === 1
                      ? styles['hot-card-rank-gold2']
                      : i === 2
                        ? styles['hot-card-rank-gold3']
                        : ''
                }`}
              >
                {String(item.num).padStart(2, '0')}
              </div>

              <div className={`${styles['hot-card-right']} ${styles['hot-card-right-book']}`}>
                <div className={styles['hot-card-right-cover']}>
                  <img src={item.pic} alt="" />
                </div>

                <div className={styles['hot-card-right-info']}>
                  <div className={styles['hot-card-right-info-title']}>{item.title}</div>
                  <div className={styles['hot-card-right-info-desc']}>{item.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewBookRanking
