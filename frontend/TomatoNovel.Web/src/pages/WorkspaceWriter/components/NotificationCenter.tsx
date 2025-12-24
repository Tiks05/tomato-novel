import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './NotificationCenter.module.scss'

import { getUserMessages, markMessagesAsRead } from '@/api/workspace.api'
import { useUserStore } from '@/store/use-user-store'

const TABS = ['全部', '审核提醒', '作品通知', '活动通知', '系统通知', '互动通知']
const PAGE_SIZE = 10

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('全部')

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 本次组件生命周期内被点击阅读的消息 id
  const readIdsRef = useRef<Set<number>>(new Set())

  const userId = useUserStore(state => state.id())

  /** 总页数 */
  const pageCount = useMemo(() => Math.ceil(total / PAGE_SIZE), [total])

  /** 可见页码 */
  const visiblePages = useMemo(() => {
    if (pageCount <= 6) return Array.from({ length: pageCount }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5]
    if (page >= pageCount - 2) {
      return [pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
    }
    return [page - 2, page - 1, page, page + 1, page + 2]
  }, [page, pageCount])

  const showEllipsis = useMemo(() => pageCount > 6 && page <= pageCount - 3, [page, pageCount])

  /** 拉取消息 */
  const fetchMessages = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const res = await getUserMessages({
        user_id: userId,
        type: activeTab === '全部' ? undefined : activeTab,
        page,
        page_size: PAGE_SIZE,
      })

      setList(res.items)
      setTotal(res.total_count)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, page, activeTab])

  /** 点击卡片 → 前端立即标记为已读 */
  const handleRead = (id: number) => {
    readIdsRef.current.add(id)

    setList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              is_read: true,
            }
          : item,
      ),
    )
  }

  /** 统一提交已读消息 */
  const submitReadIds = () => {
    if (readIdsRef.current.size === 0) return

    markMessagesAsRead({
      message_ids: Array.from(readIdsRef.current),
    })

    // 可选：提交后清空，防止重复提交
    readIdsRef.current.clear()
  }

  /** 组件卸载时提交 */
  useEffect(() => {
    return () => {
      submitReadIds()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 页面刷新 / 关闭时提交 */
  useEffect(() => {
    const handleBeforeUnload = () => {
      submitReadIds()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goPage = (val: number) => {
    if (val !== page) setPage(val)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>消息通知</h2>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        {TABS.map(tab => (
          <div key={tab} className={styles.tabWrapper}>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => {
                setActiveTab(tab)
                setPage(1)
              }}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>

      {/* 列表 */}
      {loading ? (
        <div className={styles.empty}>加载中...</div>
      ) : list.length === 0 ? (
        <div className={styles.empty}>暂无该类通知</div>
      ) : (
        <div className={styles.list}>
          {list.map(item => (
            <div key={item.id} className={styles.item} onClick={() => handleRead(item.id)}>
              {!item.is_read && <span className={styles.unreadDot} />}

              <div className={styles.header}>
                <div className={styles.itemTitle}>{item.title}</div>
                <span className={styles.time}>{item.time}</span>
              </div>

              <div className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          ))}
        </div>
      )}

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

export default NotificationCenter
