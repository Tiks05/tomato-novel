import { useEffect, useMemo, useState } from 'react'

import BookCard from './BookCard'
import { getBookList } from '@/api/library.api'

import styles from './BookList.module.scss'

const BookList = ({ filters }: any) => {
  const [sortIndex, setSortIndex] = useState(0)
  const sortTypes = ['hot', 'new', 'words']

  const [page, setPage] = useState(1)
  const pageSize = 18
  const [total, setTotal] = useState(0)

  const [booklist, setBooklist] = useState<any[]>([])

  const pageCount = useMemo(() => Math.ceil(total / pageSize), [total])

  const visiblePages = useMemo(() => {
    if (pageCount <= 6) return Array.from({ length: pageCount }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5]
    if (page >= pageCount - 2) {
      return [pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
    }
    return [page - 2, page - 1, page, page + 1, page + 2]
  }, [page, pageCount])

  const showEllipsis = useMemo(() => pageCount > 6 && page <= pageCount - 3, [page, pageCount])

  const fetchBooks = async () => {
    const res = await getBookList({
      ...filters,
      sort: sortTypes[sortIndex],
      page,
      pageSize,
    })

    setBooklist(res.records)
    setTotal(res.total)
  }

  const goPage = (val: number) => {
    if (val !== page) setPage(val)
  }

  const sortClick = (index: number) => {
    setSortIndex(index)
    setPage(1)
  }

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, sortIndex])

  return (
    <div className={styles.library_list}>
      {/* 排序 */}
      <div className={styles.sort}>
        <span className={sortIndex === 0 ? styles.on : ''} onClick={() => sortClick(0)}>
          最热
        </span>
        <span className={sortIndex === 1 ? styles.on : ''} onClick={() => sortClick(1)}>
          最新
        </span>
        <span className={sortIndex === 2 ? styles.on : ''} onClick={() => sortClick(2)}>
          字数
        </span>
      </div>

      {/* 列表 */}
      <div className={styles.list}>
        {booklist.map(item => (
          <div className={styles.library_item} key={item.id}>
            <BookCard book={item} />
          </div>
        ))}
      </div>

      {/* 分页 */}
      {pageCount > 1 && (
        <div className={styles['custom-pagination']}>
          <button className={styles['page-btn']} disabled={page === 1} onClick={() => goPage(page - 1)}>
            上一页
          </button>

          {visiblePages.map(p => (
            <button
              key={p}
              className={`${styles['page-btn']} ${p === page ? styles.active : ''}`}
              onClick={() => goPage(p)}
            >
              {p}
            </button>
          ))}

          {showEllipsis && <span>...</span>}

          <button className={styles['page-btn']} disabled={page === pageCount} onClick={() => goPage(page + 1)}>
            下一页
          </button>
        </div>
      )}
    </div>
  )
}

export default BookList
