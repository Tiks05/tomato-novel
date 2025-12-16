import { useGoTo } from '@/hooks/use-go-to'

import styles from './ClassCard.module.scss'

const ClassCard = ({ classitem }: any) => {
  const { goTo } = useGoTo()

  return (
    <div className={styles.classcard} onClick={() => goTo(classitem.path)}>
      <div className={styles.pic}>
        <img src={classitem.cover_url} alt="cover" />

        {classitem.is_include_video && (
          <div className={styles.btn}>
            <img src="/src/assets/images/writer/classroom/play-icon.png" alt="play" />
          </div>
        )}
      </div>

      <div className={styles.text}>
        <div className={styles.name}>{classitem.title}</div>
        <div className={styles.content}>{classitem.intro}</div>
      </div>
    </div>
  )
}

export default ClassCard
