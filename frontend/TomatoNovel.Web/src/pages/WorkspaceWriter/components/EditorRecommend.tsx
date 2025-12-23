import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Pagination, EffectFade, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { useGoTo } from '@/hooks/use-go-to'
import {} from '@/api/workspace.api'

import styles from './EditorRecommend.module.scss'

const EditorRecommend = () => {
  const { goTo } = useGoTo()
  const swiperRef = useRef<SwiperInstance | null>(null)

  const list = [
    {
      title: '黑科技文，让科幻不再遥远',
      desc: '一直以来，科幻似乎都只是出版物的领域，三体、智子、流浪地球、球状闪电，一个个脑洞大开奇美瑰丽的设想，和网文显得那么遥远。可是网文真的不能拥有科幻吗？老套的末日之外网文作者的脑洞不能释放吗？并非如此！黑科技文，让科幻不再遥远。可控核聚变，光学隐身，航母，太空站，太空电梯，机甲，无人机，各种各样的科技一样可以在网文中发光发热，最有科幻风格的升级变强，当然就是爬科技树，不论是末日前带领国家一起肝科技拯救世界，还是架空背景下帮助国家打破科技封锁，还是帮助人类走进太空，走进宇宙，在系统的帮助下，黑科技文变得不再难写，爽点十足，首秀有量，快来试试吧。',
      desc2: '黑科技文，最脑洞大开的升级之路，好写有量，爽点十足',
      pic: '/src/assets/images/workspace/writer/profile1.png',
    },
    {
      title: '竞技类游戏文！映照潮汐的起伏，以免迷失战',
      desc: '所有的星星眼，都在等一颗星。而我们在等你。你曾少年义气，与三五好友通宵闯关；你曾怀揣梦想，对战场策略指点江河；你曾心似骄阳，在决斗场上分秒必争；你也曾与梦中穿梭，赞叹于自己无数次回眸的幻想国度。',
      desc2: '竞技类游戏文空间广潜力大，各类游戏均收，审稿迅速',
      pic: '/src/assets/images/workspace/writer/profile2.png',
    },
    {
      title: '恐怖末世题材，读者最爱的诡异世界神豪文！',
      desc: '惊悚灵异背景的神豪文！末世降临诡异复苏的时代里，财产可能失去了意义，但主角还是可以当神豪！只不过主角的万亿资产不再是钱，而是诡异世界里的冥符、阴兵……神豪变成诡豪，读者喜闻乐见的神豪套路，换成惊悚元素，就能带来全新的新鲜感刺激感，成为有辨识度和的新类型。',
      desc2: '末世降临万诡横行，诡豪套路助你成就大神！',
      pic: '/src/assets/images/workspace/writer/profile3.png',
    },
    {
      title: '我问燕子你为啥来，燕子说，现言脑洞好赚钱',
      desc: '以现代为基站，以时光为媒介，直播星际，求生末世，逆袭娱乐圈，养成小萌宝，带着空间囤地球，绑定系统踏宇宙，为国家出战，为女性高歌，在脑洞中遨游，写出你的脑内须弥！',
      desc2: '门槛低，上限高，脑洞大于文笔，快来尝试！',
      pic: '/src/assets/images/workspace/writer/profile4.png',
    },
  ]

  return (
    <div className={styles.homeActivity}>
      <div className={styles.serialCard}>
        {/* 标题 */}
        <div className={styles.homeActivityTitle}>
          <h4>主编力签</h4>

          <span className={styles.more} onClick={() => goTo('/workspace/editor/all')}>
            查看全部
            <svg viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
              <path
                d="M14 11l5 5-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Swiper */}
        <div className={styles.editorSwiper}>
          <Swiper
            modules={[Pagination, Autoplay]}
            autoHeight
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            onSwiper={swiper => {
              swiperRef.current = swiper
              setTimeout(() => swiper.update(), 100)
            }}
          >
            {list.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={styles.slideContent}>
                  <div className={styles.title}>{slide.title}</div>

                  <div className={styles.desc}>{slide.desc}</div>

                  <div className={styles.mass}>
                    <div className={styles.pic}>
                      <img src={slide.pic} />
                    </div>
                    <p>{slide.desc2}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default EditorRecommend
