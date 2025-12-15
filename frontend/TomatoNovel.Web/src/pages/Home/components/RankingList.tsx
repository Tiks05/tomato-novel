import { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { fetchTopBooks } from '@/api/home.api'
import { useGoTo } from '@/hooks/use-go-to'
import styles from './RankingList.module.scss'

const RankingList = () => {
  const { goTo } = useGoTo()
  
  const swiperRef = useRef<any>(null)

  const [rawData, setRawData] = useState<any[]>([])
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  /**
   * 等价 Vue computed
   * 每 9 条分页，含特殊最后一页（22~30）
   */
  const shortcuts = useMemo(() => {
    const pageSize = 9
    const pages: any[][] = []
    const total = rawData.length

    // 正常前三页（0~26）
    for (let i = 0; i < 27 && i < total; i += pageSize) {
      pages.push(rawData.slice(i, i + pageSize))
    }

    // 特殊最后一页：22~30（下标 21~29）
    if (total >= 30) {
      pages.push(rawData.slice(21, 30))
    } else if (total > 27) {
      pages.push(rawData.slice(21, total))
    }

    return pages
  }, [rawData])

  /** Swiper 初始化 */
  const handleSwiper = (swiper: any) => {
    swiperRef.current = swiper
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  /** slide 改变 */
  const handleSlideChange = () => {
    if (!swiperRef.current) return
    setIsBeginning(swiperRef.current.isBeginning)
    setIsEnd(swiperRef.current.isEnd)
  }

  /** 上一页 */
  const slidePrev = () => {
    swiperRef.current?.slidePrev()
  }

  /** 下一页 */
  const slideNext = () => {
    swiperRef.current?.slideNext()
  }

  /** 初始化请求排行榜数据 */
  useEffect(() => {
    const loadData = async () => {
      const res = await fetchTopBooks()
      setRawData(res || [])
    }
    loadData()
  }, [])

  return (
    <div className={styles.ranking_wrapper}>
      {/* 标题 */}
      <div className={styles.ranking_title}>
        <h2>番茄巅峰榜</h2>
        <p>根据作品好评、人气、互动等综合得分排行</p>
      </div>

      {/* Swiper */}
      <div className={styles.ranking_swiper}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          loop={false}
          autoplay={{ delay: 3000 }}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
        >
          {shortcuts.map((group, i) => (
            <SwiperSlide key={i} className={styles.slide}>
              {group.map((slide, j) => (
                <div className={styles.item} key={j}>
                  <div
                    className={[
                      styles.con,
                      slide.num === '01'
                        ? styles.con1
                        : slide.num === '02'
                          ? styles.con2
                          : slide.num === '03'
                            ? styles.con3
                            : '',
                    ].join(' ')}
                    onClick={() => goTo(slide.path)}
                  >
                    <div className={styles.txt}>
                      <div className={styles.number}>{slide.num}</div>
                      <h4>{slide.title}</h4>
                      <p>{slide.desc}</p>
                    </div>

                    <div className={styles.pic}>
                      <img src={slide.pic} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 上一页按钮 */}
        <div className={`swiper-button-prev ${isBeginning ? 'swiper-button-disabled' : ''}`} onClick={slidePrev} />

        {/* 下一页按钮 */}
        <div className={`swiper-button-next ${isEnd ? 'swiper-button-disabled' : ''}`} onClick={slideNext} />
      </div>
    </div>
  )
}

export default RankingList
