import { useEffect, useState, useRef } from 'react'
import styles from './Sort.module.scss'
import { useGoTo } from '@/hooks/use-go-to'
import { fetchRankingList } from '@/api/home.api'

// Swiper React 组件
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const Sort = () => {
  const { goTo } = useGoTo()

  const [readerType, setReaderType] = useState<'男生' | '女生'>('男生')
  const [sortlist, setSortlist] = useState<any[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [item1index, setItem1index] = useState(0)
  const [item2index, setItem2index] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const swiperRef = useRef<any>(null)

  const categoryList = ['西方奇幻', '东方仙侠']

  // 计算昨日日期：MM-DD 格式
  const yesterdayDate = (() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const month = String(yesterday.getMonth() + 1).padStart(2, '0')
    const day = String(yesterday.getDate()).padStart(2, '0')
    return `${month}-${day}`
  })()

  // 请求所有分类榜单数据
  const fetchAllCategories = async () => {
    const result: any[] = []
    for (const cat of categoryList) {
      try {
        const res = await fetchRankingList({
          readerType,
          plot_type: cat,
        })
        console.log('', readerType)
        result.push(res)
      } catch (e) {
        console.error('加载榜单失败：', e)
      }
    }
    setSortlist(result)
  }

  useEffect(() => {
    fetchAllCategories()
  }, [readerType])

  const switchReader = (type: '男生' | '女生') => {
    if (readerType !== type) {
      setReaderType(type)
      setItem1index(0)
      setItem2index(0)
    }
  }

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex)
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
    setItem1index(0)
    setItem2index(0)
  }

  const slidePrev = () => {
    swiperRef.current?.slidePrev()
  }

  const slideNext = () => {
    swiperRef.current?.slideNext()
  }

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index)
  }

  const MouseOne = (num: number) => setItem1index(num)
  const MouseTwo = (num: number) => setItem2index(num)

  return (
    <div className={styles.bg_hui}>
      <div className={styles.sort_wrapper}>
        <div className={styles.chose_tit}>
          <span className={readerType === '男生' ? styles.on : ''} onClick={() => switchReader('男生')}>
            男频排行榜
          </span>
          <span className={readerType === '女生' ? styles.on : ''} onClick={() => switchReader('女生')}>
            女频排行榜
          </span>
        </div>

        <div className={styles.type_list}>
          {sortlist.map((item: any, index: number) => (
            <span
              key={index}
              className={`${styles['custom-pagination-bullet']} ${activeIndex === index ? styles.on : ''}`}
              onClick={() => goToSlide(index)}
            >
              {item.plot_type}
            </span>
          ))}
        </div>

        <div className={styles.sort_swiper}>
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 3000000 }}
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {sortlist.map((item: any, i: number) => (
              <SwiperSlide key={i} className={styles.slide}>
                {/* 阅读榜 */}
                <div className={styles.item}>
                  <div className={styles.title}>
                    <h3>{item.plot_type}·阅读榜</h3>
                    <p>仅展示原创作品，统计时间截止至{yesterdayDate} 24:00</p>
                  </div>

                  {item.child.map((slide: any, j: number) => (
                    <div
                      key={j}
                      className={`${styles.p} ${item1index === j ? styles.on : ''}`}
                      onClick={() => goTo(slide.path)}
                      onMouseOver={() => MouseOne(j)}
                    >
                      <div className={styles.text}>
                        <h4>
                          <em className={j === 0 ? styles.em0 : j === 1 ? styles.em1 : j === 2 ? styles.em2 : ''}>
                            {slide.num}
                          </em>
                          {slide.title}
                        </h4>
                        <span>{slide.author}</span>
                        <p>{slide.desc}</p>
                      </div>
                      <div className={styles.pic}>
                        <img src={slide.pic} alt="" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 新书榜 */}
                <div className={`${styles.item} ${styles.item_new}`}>
                  <div className={styles.title}>
                    <h3>{item.plot_type}·新书榜</h3>
                    <p>仅展示原创作品，统计时间截止至{yesterdayDate} 24:00</p>
                  </div>

                  {item.new_child.map((slide: any, j: number) => (
                    <div
                      key={j}
                      className={`${styles.p} ${item2index === j ? styles.on : ''}`}
                      onClick={() => goTo(slide.path)}
                      onMouseOver={() => MouseTwo(j)}
                    >
                      <div className={styles.text}>
                        <h4>
                          <em className={j === 0 ? styles.em0 : j === 1 ? styles.em1 : j === 2 ? styles.em2 : ''}>
                            {slide.num}
                          </em>
                          {slide.title}
                        </h4>
                        <span>{slide.author}</span>
                        <p>{slide.desc}</p>
                      </div>
                      <div className={styles.pic}>
                        <img src={slide.pic} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 上一页按钮 */}
          <div className={`swiper-button-prev ${isBeginning ? 'swiper-button-disabled' : ''}`} onClick={slidePrev} />

          {/* 下一页按钮 */}
          <div className={`swiper-button-next ${isEnd ? 'swiper-button-disabled' : ''}`} onClick={slideNext} />
        </div>
      </div>
    </div>
  )
}

export default Sort
