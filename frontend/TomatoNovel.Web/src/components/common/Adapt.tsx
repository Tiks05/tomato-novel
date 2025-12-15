import { useEffect, useState } from 'react'
import styles from './Adapt.module.scss'

import { useGoTo } from '@/hooks/use-go-to'
import { getAdaptList } from '@/api/common.api'

const Adapt = () => {
  const { goTo } = useGoTo()

  const [adaptlist, setAdaptlist] = useState<any[]>([])
  const [duration, setDuration] = useState(30)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdaptList({ limit: 20 })

      const list = Array.isArray(res) ? res : res.data

      setAdaptlist(list)

      const itemWidth = 215 + 20
      const totalWidth = list.length * itemWidth
      const speed = 100
      setDuration(totalWidth / speed)
    }

    fetchData()
  }, [])

  return (
    <div className={styles.adapt_wrapper}>
      <div className={styles.tit}>
        <h2>版权改编</h2>
        <p>热门版权改编动漫、影视尽在番茄小说——来番茄小说，追精品IP原著小说</p>
        <span>查看全部</span>
      </div>

      <div className={styles['marquee-container']}>
        <div className={styles.adapt_list} style={{ ['--scroll-duration' as any]: `${duration}s` }}>
          {adaptlist.map((item, index) => (
            <div key={index} className={styles.item} onClick={() => goTo(item.path)}>
              <img src={item.pic} alt="" />
            </div>
          ))}

          {/* 复制一份，用于无缝滚动 */}
          {adaptlist.map((item, index) => (
            <div key={index + adaptlist.length} className={styles.item} onClick={() => goTo(item.path)}>
              <img src={item.pic} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Adapt
