import { useEffect, useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectFade, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { useGoTo } from '@/hooks/use-go-to'
import { getBannerList } from '@/api/common.api'

import styles from './Banner.module.scss'

export default function Banner() {
  const { goTo } = useGoTo()

  const [bannerList, setBannerList] = useState<any[]>([])

  const swiperRef = useRef<any>(null)

  const fetchBannerList = async () => {
    // request.ts 已经解包 data
    const res = await getBannerList({ limit: 5 })
    setBannerList(res || [])
  }

  const handleSwiper = (swiper: any) => {
    swiperRef.current = swiper
    // React 18 + StrictMode 保险处理
    setTimeout(() => swiper.update(), 100)
  }

  useEffect(() => {
    fetchBannerList()
  }, [])

  return (
    <div className={styles.index_banner}>
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        pagination={{ clickable: true }}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={handleSwiper}
      >
        {bannerList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slideContent} onClick={() => goTo(item.path)}>
              <img src={item.banner_url} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
