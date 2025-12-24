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

  const userId = userStore.id()
  const isLogin = userStore.isLogin()

  const [type, setType] = useState<1 | 2>(1)
  const [booklist, setBooklist] = useState<any[]>([])

  useEffect(() => {
    if (!userId) {
      setBooklist([])
      return
    }

    const fetchMyBooks = async () => {
      try {
        const res: any = await getMyBookList({ user_id: userId })
        const books = res.books
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

            {showNovel && (
              <div className={[styles['header-label'], styles['header-label_right']].join(' ')}>
                <div className={styles['hoverup']}>
                  查看全部
                  <span className="header-label-icon tomato-circle-right"></span>
                </div>
              </div>
            )}

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

                    const currentStep = item.state != null ? Number(item.state) : 1

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

                        {/* 流程条 */}
                        <div
                          className={[
                            styles['book-tip-step-outer'],
                            styles['book-tip-step-outer-compact'],
                            styles['book-tip-step-expand'],
                          ].join(' ')}
                        >
                          <div className={styles['book-tip-step']}>
                            <div className={styles['book-tip-step-content']}>
                              {[
                                { label: '创建作品', step: 0 },
                                { label: '作品可搜', step: 1 },
                                { label: '作品签约', step: 2 },
                                { label: '作品推荐', step: 3 },
                                { label: '作品完结', step: 4 },
                              ].map((s, idx) => {
                                const isDone = currentStep >= s.step
                                const isCurrent = currentStep === s.step
                                const isFuture = currentStep < s.step

                                return (
                                  <div
                                    key={idx}
                                    className={[
                                      styles['tip-step'],
                                      isDone && styles['tip-step-done'],
                                      isCurrent && styles['tip-step-current'],
                                      isFuture && styles['tip-step-future'],
                                    ]
                                      .filter(Boolean)
                                      .join(' ')}
                                  >
                                    <div className={styles['tip-step-line']}>
                                      {isCurrent ? (
                                        <svg
                                          className={styles['tip-step-line-icon']}
                                          width="22"
                                          height="22"
                                          viewBox="0 0 22 22"
                                          fill="none"
                                        >
                                          <path
                                            fill="#FF5F00"
                                            stroke="#fff"
                                            strokeWidth="1.5"
                                            d="M16.657 13.435Zm0 0-.003-.004m.003.004-.003-.004m0 0ZM5.869 12.9l-.108.11.108-.11a7.03 7.03 0 0 1 0-10.06C8.701.053 13.3.053 16.131 2.84a7.03 7.03 0 0 1 0 10.06l.133.135-.133-.135L11 17.948 5.87 12.9z"
                                          />
                                          <circle cx="11" cy="8" r="2" fill="#FBFBFB" />
                                        </svg>
                                      ) : (
                                        <span className={styles['tip-step-line-dot-wrapper']}>
                                          <span className={styles['tip-step-line-dot']} />
                                        </span>
                                      )}
                                    </div>

                                    <div className={styles['tip-step-text']}>
                                      {s.label}
                                      {s.label === '作品可搜' && !isFuture && (
                                        <span className={styles['tip-step-tag']}>实名认证</span>
                                      )}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
            </div>
          )}

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
