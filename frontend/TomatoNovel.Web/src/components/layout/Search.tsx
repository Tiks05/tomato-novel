import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useGoTo } from '@/hooks/use-go-to'
import { searchBooks } from '@/api/layout.api'

import styles from './Search.module.scss'

const Layout = () => {
  const { goTo } = useGoTo()
  const navigate = useNavigate()
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const [keyword, setKeyword] = useState(query.get('keyword') || '')

  const [page, setPage] = useState(1)
  const pageSize = 10
  const [total, setTotal] = useState(0)

  const pageCount = Math.ceil(total / pageSize)

  const visiblePages = (() => {
    if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i + 1)
    if (page <= 3) return [1, 2, 3, 4, 5]
    if (page >= pageCount - 2) return [pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
    return [page - 2, page - 1, page, page + 1, page + 2]
  })()

  const showEllipsis = pageCount > 5 && page <= pageCount - 3

  const [type, setType] = useState(0)
  const [lineLeft, setLineLeft] = useState(22)
  const [ischose, setIschose] = useState(false)

  const [timeindex, setTimeindex] = useState(0)
  const [numindex, setNumindex] = useState(0)
  const [stateindex, setStateindex] = useState(0)

  const time = ['全部', '过去三十分钟', '今天', '本周', '本月', '今年']
  const num = ['全部', '30万字以下', '30-50万', '50-100万', '100-200万']
  const state = ['全部', '已完结', '连载中']

  const [booklist, setBooklist] = useState<any[]>([])

  const fetchBooks = async () => {
    const res = await searchBooks({
      keyword,
      type,
      time_index: timeindex,
      num_index: numindex,
      state_index: stateindex,
      page,
      page_size: pageSize,
    })

    setBooklist(res.records || [])
    setTotal(res.total || 0)
  }

  const onEnter = () => {
    navigate(`?keyword=${encodeURIComponent(keyword)}`)
    setPage(1)
    fetchBooks()
  }

  const moveLine = (index: number) => {
    setType(index)
    setLineLeft(22 + 64 * index)
    setPage(1)
    navigate(`?keyword=${encodeURIComponent(keyword)}`)
    fetchBooks()
  }

  const goPage = (p: number) => {
    if (p !== page && p >= 1 && p <= pageCount) {
      setPage(p)
      fetchBooks()
    }
  }

  const highlight = (text: string, key: string) => {
    if (!key) return text
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'gi')
    return text.replace(regex, match => `<span class="${styles['highlight-text']}">${match}</span>`)
  }

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, timeindex, numindex, stateindex])

  useEffect(() => {
    const urlKeyword = query.get('keyword') || ''
    if (urlKeyword !== keyword) {
      setKeyword(urlKeyword)
      setPage(1)
      fetchBooks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navMenus = [
    { path: '/home', label: '首页' },
    { path: '/library', label: '书库' },
    { path: '/bookshelf', label: '书架' },
    { path: '/writer', label: '作家专区' },
    { path: '/copyright', label: '版权专区' },
  ]

  return (
    <div>
      <Header menus={navMenus} />
      <div className={styles.header_h} />

      <div className={styles.seach_wp}>
        {/* 搜索栏 */}
        <div className={styles.seach}>
          <i className={styles['el-icon']}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
              />
            </svg>
          </i>
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onEnter()}
            placeholder="请输入书名或作者名"
          />
          <span onClick={onEnter}>搜索</span>
        </div>

        {/* 排序 + 筛选 */}
        <div className={styles.seach_type}>
          <div className={styles.top}>
            <div className={`${styles.item} ${type === 0 ? styles.on : ''}`} onClick={() => moveLine(0)}>
              <span>相关</span>
            </div>
            <div className={`${styles.item} ${type === 1 ? styles.on : ''}`} onClick={() => moveLine(1)}>
              <span>最热</span>
            </div>
            <div className={`${styles.item} ${type === 2 ? styles.on : ''}`} onClick={() => moveLine(2)}>
              <span>最新</span>
            </div>
            <div
              className={`${styles.item} ${styles['item_c']} ${ischose ? styles.on : ''}`}
              onClick={() => setIschose(!ischose)}
            >
              <span>筛选</span>
              <img className={styles.img1} src="/src/assets/icons/arrow-right/icons8-arrow-100.png" />
              <img className={styles.img2} src="/src/assets/icons/arrow-right/icons9-arrow-100.png" />
            </div>
            <div className={styles.line} style={{ left: `${lineLeft}px` }} />
          </div>

          {ischose && (
            <div className={styles.bottom}>
              <div className={styles['filter-condition']}>
                <div className={styles['condition-title']}>更新时间：</div>
                {time.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles['condition-item']} ${timeindex === index ? styles.active : ''}`}
                    onClick={() => {
                      setTimeindex(index)
                      setPage(1)
                      fetchBooks()
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className={styles['filter-condition']}>
                <div className={styles['condition-title']}>字数：</div>
                {num.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles['condition-item']} ${numindex === index ? styles.active : ''}`}
                    onClick={() => {
                      setNumindex(index)
                      setPage(1)
                      fetchBooks()
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className={styles['filter-condition']}>
                <div className={styles['condition-title']}>状态：</div>
                {state.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles['condition-item']} ${stateindex === index ? styles.active : ''}`}
                    onClick={() => {
                      setStateindex(index)
                      setPage(1)
                      fetchBooks()
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 提示 */}
        <div className={styles['muye-search-hint']}>
          共 <span className={styles.count}>{total}</span> 项相关的结果
        </div>

        {/* 列表 */}
        <div className={styles['muye-search-book-list']}>
          {booklist.map((item: any, index: number) => (
            <div className={styles['search-book-item']} key={index}>
              <div className={styles['book-item-cover']} onClick={() => goTo(item.path)}>
                <img src={item.pic} />
              </div>

              <div className={styles['book-item-text']}>
                <div className={styles.title} dangerouslySetInnerHTML={{ __html: highlight(item.title, keyword) }} />

                <div className={styles.desc}>
                  <span dangerouslySetInnerHTML={{ __html: highlight(item.author, keyword) }} />
                  <span className={styles.span}>{item.status}</span>
                  <span className={styles.span}>
                    {item.word_count}字 · {item.people}人在读
                  </span>
                </div>

                <div className={`${styles.desc} ${styles.abstract}`}>{item.intro}</div>

                <div className={styles.footer} onClick={() => goTo(item.update_path)}>
                  <span className={styles.chapter}>最近更新：{item.update || '暂无章节'}</span>
                  <span>{item.updated_at}</span>
                </div>
              </div>

              <div className={styles.read} onClick={() => goTo(item.read_path)}>
                立即阅读
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        {pageCount > 1 && (
          <div className={styles['custom-pagination']}>
            <button disabled={page === 1} onClick={() => goPage(page - 1)}>
              上一页
            </button>

            {visiblePages.map(p => (
              <button key={p} className={p === page ? styles.active : ''} onClick={() => goPage(p)}>
                {p}
              </button>
            ))}

            {showEllipsis && <span>...</span>}

            <button disabled={page === pageCount} onClick={() => goPage(page + 1)}>
              下一页
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Layout
