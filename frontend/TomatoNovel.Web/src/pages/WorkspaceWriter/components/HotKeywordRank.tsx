import { useState } from 'react'
import { useGoTo } from '@/hooks/use-go-to'
import styles from './HotKeywordRank.module.scss'

// 统一出口（当前未用到，但按你要求保留）
import {} from '@/api/workspace.api'

const HotKeywordRank = () => {
  const { goTo } = useGoTo()

  const [bill, setBill] = useState(1)
  const [sex, setSex] = useState(1)

  const wordlist = [
    { num: '01', title: '游戏', type: 1, change: 2 },
    { num: '02', title: '单女主', type: 1, change: 4 },
    { num: '03', title: '末世', type: 2, change: 1 },
    { num: '04', title: '搞笑', type: 2, change: 1 },
    { num: '05', title: '异能', type: 2, change: 1 },
    { num: '06', title: '搞笑', type: 2, change: 1 },
    { num: '07', title: '异能', type: 2, change: 1 },
    { num: '08', title: '搞笑', type: 2, change: 1 },
    { num: '09', title: '异能', type: 2, change: 1 },
    { num: '10', title: '末世', type: 2, change: 1 },
    { num: '11', title: '末世', type: 2, change: 1 },
    { num: '12', title: '末世', type: 2, change: 1 },
  ]

  return (
    <div className={styles['home-hot-word-list']}>
      {/* header */}
      <div className={styles['word-list-header']}>
        <div className={styles['author-title']}>
          <span className={styles['author-title-content']}>
            <div>书荒热词榜</div>
          </span>

          <span className={styles['author-title-extra']}>
            <span className={`${styles['word-list-header-title-more']} hoverup`}>
              查看全部
              <svg
                className={`${styles['serial-icon']} ${styles['serial-icon-general_arrow_circle']} ${styles['word-list-header-title-more-icon']}`}
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M14.7071 10.359C14.3166 9.96849 13.6835 9.96849 13.2929 10.359C12.9024 10.7495 12.9024 11.3827 13.2929 11.7732L17.5356 16.0159L13.2929 20.2585C12.9024 20.649 12.9024 21.2822 13.2929 21.6727C13.6835 22.0632 14.3166 22.0632 14.7071 21.6727L19.6569 16.723C20.0474 16.3325 20.0474 15.6993 19.6569 15.3088L14.7071 10.359Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16Z"
                />
              </svg>
            </span>
          </span>
        </div>
      </div>

      {/* switch */}
      <div className={styles['word-list-switch']}>
        <div className={styles['word-list-switch-channel']}>
          <span className={bill === 1 ? styles.active : ''} onClick={() => setBill(1)}>
            脑洞榜
          </span>
          <span className={bill === 2 ? styles.active : ''} onClick={() => setBill(2)}>
            传统榜
          </span>
        </div>

        <div className={styles['word-list-switch-type']}>
          <span className={sex === 1 ? styles.active : ''} onClick={() => setSex(1)}>
            男频
          </span>
          <span className={sex === 2 ? styles.active : ''} onClick={() => setSex(2)}>
            女频
          </span>
        </div>
      </div>

      {/* list */}
      <div className={styles['word-list-content']}>
        {wordlist.map((item, i) => (
          <div className={styles['hot-card']} key={i}>
            <div
              className={`${styles['hot-card-rank']} ${
                i === 0
                  ? styles['hot-card-rank-gold1']
                  : i === 1
                    ? styles['hot-card-rank-gold2']
                    : i === 2
                      ? styles['hot-card-rank-gold3']
                      : ''
              }`}
            >
              {item.num}
            </div>

            <div
              className={`${styles['hot-card-arrow']} ${
                item.type === 1 ? styles['hot-card-arrow-up'] : styles['hot-card-arrow-down']
              }`}
            >
              {item.change}
            </div>

            <div className={styles['hot-card-right']}>
              <span className={styles['hot-card-right-wrap']}>
                <span className={styles['hot-card-right-type']}>
                  <span className={styles['hot-card-right-type-text']}>{item.title}</span>
                  <span className={styles['tomato-left']}>
                    <img src="/src/assets/icons/arrow-right/icons8-arrow-100.png" alt="" />
                  </span>
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotKeywordRank
