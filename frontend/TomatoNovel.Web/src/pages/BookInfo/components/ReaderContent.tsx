import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ReaderHeader from './ReaderHeader'
import { useGoTo } from '@/hooks/use-go-to'
import { getChapterContent } from '@/api/book-info.api'

import styles from './ReaderContent.module.scss'

const ReaderContent = () => {
  const { goTo } = useGoTo()
  const { bookId, volumeId, chapterId } = useParams()

  const [chapterIndex, setChapterIndex] = useState(0)
  const [bookTitle, setBookTitle] = useState('')
  const [chapterTitle, setChapterTitle] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [updatedAt, setUpdatedAt] = useState('')
  const [content, setContent] = useState<string[]>([])
  const [prevChapterId, setPrevChapterId] = useState<number | null>(null)
  const [nextChapterId, setNextChapterId] = useState<number | null>(null)

  const fetchContent = async () => {
    if (!bookId || !volumeId || !chapterId) return

    try {
      const res = await getChapterContent({ bookId, volumeId, chapterId } as any)

      const data = res

      setBookTitle(data.book_title)
      setChapterTitle(data.chapter_title)
      setWordCount(data.word_count)
      setUpdatedAt(data.updated_at)
      setContent(data.content.split('\n'))
      setChapterIndex(data.chapter_index || 1)
      setPrevChapterId(data.prev_chapter_id || null)
      setNextChapterId(data.next_chapter_id || null)

      console.log('章节内容获取成功', data)
    } catch (err) {
      console.error('获取章节内容失败', err)
    }
  }

  const goToPrev = () => {
    if (prevChapterId && bookId && volumeId) {
      goTo(`/read/${bookId}/${volumeId}/${prevChapterId}`)
    }
  }

  const goToNext = () => {
    if (nextChapterId && bookId && volumeId) {
      goTo(`/read/${bookId}/${volumeId}/${nextChapterId}`)
    }
  }

  useEffect(() => {
    fetchContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId])

  return (
    <div className={styles.bg_hui}>
      <div className={styles.reader_wp}>
        {/* 头部 */}
        <ReaderHeader bookTitle={bookTitle} bookId={bookId as string} />

        <div className={styles.web_reader}>
          <div className={styles.title}>
            <h4>
              第{chapterIndex}章 {chapterTitle}
            </h4>
            <p>
              <span>本章字数：{wordCount} 字</span>
              <span>更新时间：{updatedAt}</span>
            </p>
          </div>

          <div className={styles.html}>
            <div>
              {content.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          <div className={styles['btn-group']}>
            {prevChapterId && (
              <span className={styles.btn} onClick={goToPrev}>
                上一章
              </span>
            )}
            {nextChapterId && (
              <span className={styles.btn} onClick={goToNext}>
                下一章
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReaderContent
