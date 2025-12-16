import { useGoTo } from '@/hooks/use-go-to'
import {} from '@/api/library.api'

import styles from './BookCard.module.scss'

const BookCard = ({ book }: any) => {
  const { goTo } = useGoTo()

  const formatWordCount = (count: number) => {
    if (count >= 100000000) return (count / 100000000).toFixed(1) + '亿字'
    if (count >= 10000) return (count / 10000).toFixed(1) + '万字'
    return count + '字'
  }

  const truncateIntro = (intro: string) => {
    return intro.length > 40 ? intro.slice(0, 40) + '...' : intro
  }

  const formatUpdateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return '刚刚'
    if (diffHours < 24) return `${diffHours}小时前`

    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={styles.book_card} onClick={() => goTo(book.path)}>
      <div className={styles.pic}>
        <img src={book.cover_url} alt="封面" className={styles.cover} />
      </div>

      <div className={styles.info}>
        <div className={styles.title}>{book.title}</div>
        <div className={styles.author}>作者：{book.author}</div>
        <div className={styles.status}>
          {book.status}：{formatWordCount(book.word_count)}
        </div>
        <div className={styles.intro}>{truncateIntro(book.intro)}</div>
        <div className={styles['update-time']}>{formatUpdateTime(book.updated_at)}</div>
      </div>
    </div>
  )
}

export default BookCard
