import { useMemo } from 'react'

import { useGoTo } from '@/hooks/use-go-to'
import {} from '@/api/book-info.api'

import styles from './BookHeader.module.scss'

const BookHeader = ({ bookHeader }: any) => {
  const { goTo } = useGoTo()

  if (!bookHeader) return null

  const { book, author } = bookHeader

  const tags = useMemo(() => {
    if (!book?.tags) return []
    return book.tags.split(',').map((tag: string) => tag.trim())
  }, [book?.tags])

  const authorPath = author?.path || '/authorinfo'

  const latestChapter = book?.latest_chapter || ''
  const latestChapterTitle = book?.latest_chapter_title || ''

  const startReading = () => {
    if (!book?.id) return
    goTo(`/read/${book.id}/1/1`)
  }

  const addBookshelf = () => {
    alert('加入书架功能待实现')
  }

  const handleComment = () => {
    if (!book?.id) return
    goTo(`/comments/${book.id}`)
  }

  return (
    <div className={styles.bookindex_name}>
      <div className={styles.bookindex_wp}>
        {/* 面包屑 */}
        {book.title && (
          <div className={styles.now_nav}>
            <span onClick={() => goTo('/home')}>首页</span>
            <b>/</b>
            <em>{book.title}</em>
          </div>
        )}

        <div className={styles['page-header-info']}>
          {/* 封面 */}
          {book.cover_url && (
            <div className={styles.img}>
              <img src={book.cover_url} alt="封面" />
            </div>
          )}

          {/* 书籍信息 */}
          <div className={styles.info}>
            {book.title && (
              <div className={styles['info-name']}>
                <h1>{book.title}</h1>
              </div>
            )}

            {(book.status || book.tags) && (
              <div className={styles['info-label']}>
                {book.status && <span className={styles['info-label-yellow']}>{book.status}</span>}
                {tags.map((tag: string, index: number) => (
                  <span key={index} className={styles['info-label-grey']}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {book.word_count != null && (
              <div className={styles['info-count']}>
                <div className={styles['info-count-word']}>
                  <span className={styles.detail}>{(book.word_count / 10000).toFixed(1)}</span>
                  <span className={styles.text}>万字</span>
                </div>
              </div>
            )}

            {(latestChapter || book.updated_at) && (
              <div className={styles['info-last']}>
                <span className={styles['info-last-title']}>
                  最近更新：
                  {latestChapter ? (
                    <>
                      第{latestChapter}章{latestChapterTitle && <> {latestChapterTitle}</>}
                    </>
                  ) : (
                    <> 暂无章节 </>
                  )}
                </span>
                <span className={styles['info-last-time']}>{book.updated_at}</span>
              </div>
            )}

            <span className={styles['byte-btn']} onClick={startReading}>
              开始阅读
            </span>
            <span className={`${styles['byte-btn']} ${styles['byte-btn2']}`} onClick={addBookshelf}>
              加入书架
            </span>
          </div>

          {/* 作者信息 */}
          {author && (
            <div className={styles.author} onClick={() => goTo(authorPath)}>
              <div className={styles['author-divider']} />
              <div className={styles['author-info']}>
                {author.cover_url && <img className={styles['author-img']} src={author.cover_url} alt="作者头像" />}

                {author.nickname && (
                  <div className={styles['author-name']}>
                    <span className={styles['author-name-logo']} />
                    <span className={styles['author-name-text']}>{author.nickname}</span>
                  </div>
                )}

                {author.signature && <div className={styles['author-desc']}>{author.signature}</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookHeader
