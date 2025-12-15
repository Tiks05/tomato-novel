import { useEffect, useState } from 'react'
import styles from './Recommend.module.scss'
import { useGoTo } from '@/hooks/use-go-to'
import { getRecommendBooks } from '@/api/home.api'

// 直接导入图片（推荐方式，构建工具会自动处理路径和优化）
import recommend1 from '@/assets/images/home/recommend/recommend-1.png'
import recommend2 from '@/assets/images/home/recommend/recommend-2.png'
import recommend3 from '@/assets/images/home/recommend/recommend-3.png'
import recommend4 from '@/assets/images/home/recommend/recommend-4.png'
import arrowIcon from '@/assets/icons/arrow-right/icons8-arrow-100.png'

const Recommend = () => {
  const { goTo } = useGoTo()
  const [malelist, setMalelist] = useState<any[]>([])
  const [femalelist, setFemalelist] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const fetchData = async () => {
    const res = await getRecommendBooks()
    const data = res

    setMalelist(
      data.male.map((item: any) => ({
        ...item,
        pic: item.cover_url,
        desc: item.author_nickname,
      })),
    )

    setFemalelist(
      data.female.map((item: any) => ({
        ...item,
        pic: item.cover_url,
        desc: item.author_nickname,
      })),
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.recommend_wrapper}>
      {/* 男频精选 */}
      <div className={`${styles.list} ${styles.list_one}`}>
        <div className={styles.wrapper}>
          <h2>男频精选</h2>

          <div className={styles.book_list}>
            {malelist.map((item, i) => (
              <div key={i} className={styles.item} onClick={() => goTo(item.path)}>
                <div className={styles.pic}>
                  <img src={item.pic} alt="" />
                </div>
                <div className={styles.text}>
                  <h3 className={styles.name}>{item.title}</h3>
                  <div className={styles.author}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pic1}>
          <img src={recommend1} alt="" />
        </div>
        <div className={styles.pic2}>
          <img src={recommend2} alt="" />
        </div>
      </div>

      {/* 女频精选 */}
      <div className={`${styles.list} ${styles.list_two} ${isOpen ? styles.list_two_open : ''}`}>
        <div className={styles.wrapper}>
          <h2>女频精选</h2>

          <div className={styles.book_list}>
            {femalelist.map((item, i) => (
              <div key={i} className={styles.item} onClick={() => goTo(item.path)}>
                <div className={styles.pic}>
                  <img src={item.pic} alt="" />
                </div>
                <div className={styles.text}>
                  <h3 className={styles.name}>{item.title}</h3>
                  <div className={styles.author}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pic3}>
          <img src={recommend3} alt="" />
        </div>
        <div className={styles.pic4}>
          <img src={recommend4} alt="" />
        </div>

        <div className={styles.line}></div>

        <div className={`${styles.butt} ${isOpen ? styles.rotate : ''}`} onClick={handleOpen}>
          <img src={arrowIcon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Recommend
