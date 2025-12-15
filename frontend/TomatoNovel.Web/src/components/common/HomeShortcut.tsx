import React from 'react'
import { useGoTo } from '@/hooks/use-go-to'

import styles from './HomeShortcut.module.scss'
import arrowRight from '@/assets/icons/arrow-right/icons8-arrow-50.png'

type ShortcutItem = {
  title: string
  desc: string
  path: string
}

type HomeShortcutProps = {
  shortcuts: ShortcutItem[]
}

const HomeShortcut: React.FC<HomeShortcutProps> = ({ shortcuts }) => {
  const { goTo } = useGoTo()

  return (
    <div className={styles['home-shortcut-wrapper']}>
      <div className={styles['shortcut-list']}>
        {shortcuts.map((item, index) => (
          <div key={index} className={styles['shortcut-item']} onClick={() => goTo(item.path)}>
            <div className={styles.left}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.desc}>{item.desc}</div>
            </div>

            <div className={styles.right}>
              <img src={arrowRight} alt="arrow" className={styles['arrow-icon']} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeShortcut
