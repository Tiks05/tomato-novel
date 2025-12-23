import { useEffect, useState } from 'react'

import { useGoTo } from '@/hooks/use-go-to'
import { fetchClassroomList } from '@/api/writer.api'

import ClassCard from './ClassCard'
import styles from './Classroom.module.scss'

const Classroom = () => {
  const { goTo } = useGoTo()

  const iconTit1 = new URL('@/assets/images/writer/classroom/tit-1.png', import.meta.url).href

  const arrowRight = new URL('@/assets/icons/arrow-right/icons8-arrow-100.png', import.meta.url).href

  const stypelist = ['直播培训', '新手专区', '写作技巧', '分类进阶', '大神专访']

  const [activeIndex, setActiveIndex] = useState(0)
  const [classlist, setClasslist] = useState<any[]>([])

  const loadClassroomData = async (index = activeIndex) => {
    const category = stypelist[index]
    const res = await fetchClassroomList({ category_type: category })

    setClasslist(Array.isArray(res) ? res : [])
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    loadClassroomData(index)
  }

  useEffect(() => {
    loadClassroomData()
  }, [])

  return (
    <div className={styles.author_classroom}>
      <div className={styles.classroom_wp}>
        {/* 标题 */}
        <div className={styles.title}>
          <span>作家课堂</span>
          <img src={iconTit1} alt="标题图标" />
        </div>

        {/* 分类切换 */}
        <div className={styles.type_list}>
          {stypelist.map((item, index) => (
            <span
              key={index}
              className={`${styles['custom-pagination-bullet']} ${activeIndex === index ? styles.on : ''}`}
              onClick={() => goToSlide(index)}
            >
              {item}
            </span>
          ))}
        </div>

        {/* 卡片列表 */}
        <div className={styles.classroom_list}>
          {classlist.length > 0 && (
            <>
              {classlist.map((item, index) => (
                <div className={styles.item} key={index}>
                  <ClassCard classitem={item} />
                </div>
              ))}
            </>
          )}
        </div>

        {/* 查看全部 */}
        <div className={styles.more}>
          <span style={{ backgroundImage: `url(${arrowRight})` }} onClick={() => goTo('/classroom')}>
            查看全部
          </span>
        </div>
      </div>
    </div>
  )
}

export default Classroom
