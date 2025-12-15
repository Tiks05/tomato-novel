import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './WriterList.module.scss'

import { useGoTo } from '@/hooks/use-go-to'
import { useUserStore } from '@/store/use-user-store'
import { getWriterList } from '@/api/home.api'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const WriterList = () => {
  const { goTo } = useGoTo()
  const userStore = useUserStore()

  // swiper 实例与状态
  const swiperInstance = useRef<any>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const [writerlist, setWriterlist] = useState<any[]>([])

  // 是否跳转申请页（computed -> useMemo）
  const goToApplyPage = useMemo(() => (!userStore.isLogin ? '/' : '/workspace/apply'), [userStore.isLogin])

  // swiper 相关
  const onSwiper = (swiper: any) => {
    swiperInstance.current = swiper
  }

  const onSlideChange = () => {
    const swiper = swiperInstance.current
    if (swiper?.realIndex != null) {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
      console.log('isBeginning:', swiper.isBeginning, 'isEnd:', swiper.isEnd)
    }
  }

  const slidePrev = () => {
    swiperInstance.current?.slidePrev()
  }

  const slideNext = () => {
    swiperInstance.current?.slideNext()
  }

  // 初始化
  useEffect(() => {
    const fetchWriterList = async () => {
      const res = await getWriterList()
      setWriterlist(res)
    }

    fetchWriterList()
  }, [])

  return (
    <div className={styles.writer}>
      <div className={styles.title}>
        <h2>殿堂、金番作家</h2>

        {userStore.role() !== 'admin' && userStore.role() !== 'author' && (
          <div className={styles.more} onClick={() => goTo(goToApplyPage)}>
            成为作家
          </div>
        )}
      </div>

      <div className={styles.writer_swiper}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={7}
          spaceBetween={20}
          slidesPerGroup={3}
          loop={false}
          autoplay={{ delay: 3000000 }}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
        >
          {writerlist.map((item, i) => (
            <SwiperSlide key={i} className={styles.slide} onClick={() => goTo(item.path)}>
              <div className={styles.avatar}>
                <img src={item.pic} />
              </div>

              <div className={styles.bottom}>
                <div className={styles.name}>{item.title}</div>
                <div className={styles.level}>{item.type}</div>
                <div className={styles.desc}>{item.desc}</div>
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
  )
}

export default WriterList
