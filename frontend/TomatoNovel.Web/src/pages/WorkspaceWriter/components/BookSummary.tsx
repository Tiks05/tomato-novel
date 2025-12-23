import { useEffect, useMemo, useState } from 'react'
import { useGoTo } from '@/hooks/use-go-to'
import { useUserStore } from '@/store/use-user-store'
import { getMyBookList } from '@/api/workspace.api'
import styles from './BookSummary.module.scss'

import emptyImg from '@/assets/images/workspace/writer/empty.png'
import arrowDownImg from '@/assets/images/workspace/writer/x.png'

const BookSummary = () => {
  const { goTo } = useGoTo()
  const userStore = useUserStore()

  // ===== 从 store 取“值”（你的 store 是 getter 风格）=====
  const userId = userStore.id()
  const isLogin = userStore.isLogin()

  const [type, setType] = useState<1 | 2>(1)
  const [booklist, setBooklist] = useState<any[]>([])

  // ===== 拉取我的作品：依赖 userId（登录后会重新请求）=====
  useEffect(() => {
    if (!userId) {
      setBooklist([])
      return
    }

    const fetchMyBooks = async () => {
      try {
        const res: any = await getMyBookList({ user_id: userId })

        // 兼容两种 request 封装：return data 或 return axios response
        const books = res?.books ?? res?.data?.books ?? []
        setBooklist(Array.isArray(books) ? books : [])
      } catch (e) {
        console.error('获取我的作品失败:', e)
        setBooklist([])
      }
    }

    fetchMyBooks()
  }, [userId])

  const showNovel = type === 1
  const showStory = type === 2

  const renderEmpty = useMemo(() => {
    return (
      <div className={styles['home-book-empty']}>
        <div className={[styles['author-empty'], styles['author-empty-default']].join(' ')}>
          <img className={styles['author-empty-img']} src={emptyImg} alt="" style={{ width: 129, height: 93 }} />
          <span className={styles['author-empty-description']}>记录灵感和创意，开启属于你写作世界，并持之以恒。</span>

          <div className={styles['author-empty-footer']}>
            <div className={styles['home-book-empty__button-group']}>
              <div className={styles['btn']}>查看热门故事</div>
              <div
                className={[styles['btn'], styles['btn2']].join(' ')}
                onClick={() => goTo('/workspace/writer/create-book')}
              >
                去写作
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }, [goTo])

  return (
    <div className={styles['home-book-container']}>
      <div className={[styles['serial-card'], styles['serial-card-normal'], styles['home-book-expand']].join(' ')}>
        <div className={styles['home-book']}>
          {/* header */}
          <div className={styles['home-book-header']}>
            <span
              className={[styles['header-tab'], styles['header-tab_right'], type === 1 ? styles['active'] : ''].join(
                ' ',
              )}
              onClick={() => setType(1)}
            >
              小说
            </span>

            <span
              className={[styles['header-tab'], styles['header-tab_right'], type === 2 ? styles['active'] : ''].join(
                ' ',
              )}
              onClick={() => setType(2)}
            >
              短故事
            </span>

            {/* 右侧：查看全部（小说） */}
            {showNovel && (
              <div className={[styles['header-label'], styles['header-label_right']].join(' ')}>
                <div className={styles['hoverup']}>
                  查看全部
                  <span className="header-label-icon tomato-circle-right"></span>
                </div>
              </div>
            )}

            {/* 左侧：创建入口（小说/短故事） */}
            {showNovel && (
              <div className={[styles['header-label'], styles['header-label_left']].join(' ')}>
                <span className={styles['write-button']}>
                  <div
                    className={[styles['hoverup'], styles['write-btn-entry']].join(' ')}
                    onClick={() => goTo('/workspace/writer/create-book')}
                  >
                    创建新书
                    <span className="header-label-icon tomato-circle-add"></span>
                  </div>
                </span>
              </div>
            )}

            {showStory && (
              <div className={[styles['header-label'], styles['header-label_left']].join(' ')}>
                <span className={styles['write-button']}>
                  <div className={styles['hoverup']}>
                    创作短故事
                    <span className="header-label-icon tomato-circle-add"></span>
                  </div>
                </span>
              </div>
            )}
          </div>

          {/* 小说列表 */}
          {showNovel && (
            <div className={styles['home-book-list']}>
              {/* 未登录 / 无数据 */}
              {!isLogin || booklist.length === 0
                ? renderEmpty
                : booklist.map((item: any, i: number) => {
                    const latestNum = item.latest_chapter_num ?? 0
                    const latestTitle = item.latest_chapter_title ?? ''
                    const totalChapters = item.total_chapters ?? 0
                    const words = item.words ?? 0
                    const status = item.status ?? ''
                    const path = item.path ?? ''
                    const pic = item.pic ?? ''
                    const title = item.title ?? ''
                    const id = item.id

                    return (
                      <div
                        key={id ?? i}
                        className={[styles['home-book-item'], styles['home-book-item-home']].join(' ')}
                      >
                        <div className={styles['book-item-info']}>
                          <div className={styles['book-cover']} onClick={() => path && goTo(path)}>
                            <img src={pic} alt="" />
                          </div>

                          <div className={styles['info-content']}>
                            <div className={styles['info-content-title']} onClick={() => path && goTo(path)}>
                              {title}
                            </div>

                            <div className={styles['info-left']}>
                              <div className={styles['desc']}>
                                <span>
                                  最近更新：
                                  <span className={styles['hoverup']}>
                                    {latestNum === 0 ? '暂无章节' : `第${latestNum}章 ${latestTitle}`}
                                  </span>
                                </span>
                              </div>

                              <div className={styles['detail']}>
                                <div className={styles['detail-chapter']}>
                                  <span className={styles['right-info-number']}>{totalChapters}</span> 章
                                </div>
                                <span className={styles['detail-divider']}></span>
                                <div className={styles['detail-wordcount']}>
                                  <span className={styles['right-info-number']}>{words}</span> 字
                                </div>
                                <span className={styles['detail-divider']}></span>
                                <div className={styles['property']}>{status}</div>
                              </div>
                            </div>

                            <div className={styles['right-btns']}>
                              <button type="button">
                                <span>作品相关</span>
                                <img src={arrowDownImg} alt="" />
                                <div className={styles['down_link']}>
                                  <em onClick={() => goTo(`/workspace/writer/book-overview/${id}`)}>作品设置</em>
                                  <em onClick={() => goTo(`/workspace/writer/contract/${id}`)}>作品签约</em>
                                </div>
                              </button>

                              <button type="button" onClick={() => goTo(`/workspace/writer/manage-chapter/${id}`)}>
                                <span>章节管理</span>
                              </button>

                              <button
                                type="button"
                                className={styles['add']}
                                onClick={() => goTo(`/workspace/writer/create-chapter/${id}`)}
                              >
                                <span>创建章节</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 流程条结构完全保留（你原来就留了占位） */}
                        <div
                          className={[
                            styles['book-tip-step-outer'],
                            styles['book-tip-step-outer-compact'],
                            styles['book-tip-step-expand'],
                          ].join(' ')}
                        >
                          <div className={styles['book-tip-step']}>
                            <div
                              className={styles['book-tip-step-content']}
                              style={{ display: 'flex', width: 'auto', opacity: 1 }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
            </div>
          )}

          {/* 短故事 */}
          {showStory && (
            <div className={styles['home-book-list']}>
              <div className={styles['home-book-empty']}>
                <div className={[styles['author-empty'], styles['author-empty-default']].join(' ')}>
                  <img
                    className={styles['author-empty-img']}
                    src={emptyImg}
                    alt=""
                    style={{ width: 129, height: 93 }}
                  />
                  <span className={styles['author-empty-description']}>
                    记录灵感和创意，开启属于你写作世界，并持之以恒。
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookSummary
