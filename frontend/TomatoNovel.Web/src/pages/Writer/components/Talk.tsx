import { useGoTo } from '@/hooks/use-go-to'
import {} from '@/api/writer.api'

import styles from './Talk.module.scss'

const Talk = () => {
  const { goTo } = useGoTo()

  const tit1 = new URL('@/assets/images/writer/talk/tit-1.png', import.meta.url).href

  const t1 = new URL('@/assets/images/writer/talk/talk-1.png', import.meta.url).href

  const t2 = new URL('@/assets/images/writer/talk/talk-2.png', import.meta.url).href

  const t3 = new URL('@/assets/images/writer/talk/talk-3.png', import.meta.url).href

  const t4 = new URL('@/assets/images/writer/talk/talk-4.png', import.meta.url).href

  const t5 = new URL('@/assets/images/writer/talk/talk-5.png', import.meta.url).href

  const t6 = new URL('@/assets/images/writer/talk/talk-6.png', import.meta.url).href

  const t7 = new URL('@/assets/images/writer/talk/talk-7.png', import.meta.url).href

  return (
    <div className={styles.author_talk}>
      {/* 标题 */}
      <div className={styles.talk_title}>
        <span>
          作家有话说 <img src={tit1} alt="" />
        </span>
      </div>

      {/* 第一段 */}
      <div className={`${styles.item} ${styles.item_one}`}>
        <div className={styles.con}>
          <div className={styles.pic}>
            <img src={t1} alt="" />
          </div>
          <div className={styles.text}>
            <p>
              从落笔写下这个故事开始，便感觉自己随时面临挑战，想要将沉重的牺牲与少年的热血结合并不是一件容易的事情。
              我想写的并非只是一个人，而是一群在逆境中敢于挺身而出，秉持各自信念，向未知挑战的故事。
            </p>
            <img src={t2} alt="" />
          </div>
        </div>
      </div>

      {/* 第二段 */}
      <div className={`${styles.item} ${styles.item_two}`}>
        <div className={styles.con}>
          <div className={styles.text}>
            <p>创作一定要为难自己，作者有多苛求自己，作品就有多精彩，读者就有多喜爱。</p>
            <img src={t4} alt="" />
          </div>
          <div className={styles.pic}>
            <img src={t3} alt="" />
          </div>
        </div>
      </div>

      {/* 第三段 */}
      <div className={`${styles.item} ${styles.item_three}`}>
        <div className={styles.con}>
          <div className={styles.pic}>
            <img src={t5} alt="" />
          </div>
          <div className={styles.text}>
            <p>
              用文字书写心中的故事，倾注全部的感情与热爱，创造一个不同于现实，但又多姿多彩的崭新的小说世界。
              在小说这个世界里，有你有我有他，有我们一群志同道合的人，一起奔赴。
            </p>
            <img src={t6} alt="" />
          </div>
        </div>
      </div>

      {/* 底部大图 */}
      <div className={styles.item_pic}>
        <img src={t7} alt="" />
      </div>
    </div>
  )
}

export default Talk
