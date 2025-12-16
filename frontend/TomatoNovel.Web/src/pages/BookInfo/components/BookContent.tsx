import { useMemo } from 'react'

import { useGoTo } from '@/hooks/use-go-to'
import {} from '@/api/book-info.api'

import styles from './BookContent.module.scss'

const BookContent = ({ bookContent }: any) => {
  const { goTo } = useGoTo()

  if (!bookContent) return null

  const totalChapters = useMemo(() => {
    return bookContent.volumes.reduce((sum: number, vol: any) => sum + vol.chapter_count, 0)
  }, [bookContent])

  return (
    <div className={styles.bookinfo_catalogue}>
      <div className={styles.bookindex_wp}>
        <div className={styles['page-body']}>
          {/* 简介 */}
          <div className={styles['page-abstract-header']}>
            <h2>作品简介</h2>
          </div>

          <div className={styles['page-abstract-content']}>
            <p>{bookContent.intro}</p>
          </div>

          {/* 目录 */}
          <div className={styles['page-directory-header']}>
            <h3>
              目录
              <span className={styles['directory-dot']} />
              {totalChapters}章
            </h3>
          </div>

          <div className={styles['page-directory-content']}>
            {bookContent.volumes.map((volume: any, i: number) => (
              <div key={i}>
                <div className={`${styles.volume} ${styles.volume_first}`}>
                  {volume.title}
                  <span className={styles['volume-dot']} />共{volume.chapter_count}章
                </div>

                <div className={styles.chapter}>
                  {volume.chapters.map((chapter: any, j: number) => (
                    <div
                      key={j}
                      className={styles['chapter-item']}
                      onClick={() => goTo(chapter.path)}
                      style={{ cursor: 'pointer' }}
                    >
                      第{j + 1}章 {chapter.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookContent
