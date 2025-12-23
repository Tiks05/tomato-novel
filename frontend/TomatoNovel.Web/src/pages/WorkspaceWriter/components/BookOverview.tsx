import { useEffect, useState } from 'react'
import styles from './BookOverview.module.scss'
import { useParams } from 'react-router-dom'
import { Modal, message } from 'antd'
import { useGoTo } from '@/hooks/use-go-to'
import { getBookDetail, deleteBookById } from '@/api/workspace.api'
import FooterCopyright from '@/pages/WorkspaceWriter/components/FooterCopyright'

const BookOverview = () => {
  const { goTo } = useGoTo()
  const { bookId } = useParams()

  const [type, setType] = useState(1)
  const [bookDetail, setBookDetail] = useState<any>({})

  const fetchBookDetail = async () => {
    if (!bookId) return
    try {
      const res = await getBookDetail(Number(bookId))
      setBookDetail(res)
    } catch {
      message.error('获取作品详情失败')
    }
  }

  const handleDeleteBook = () => {
    Modal.confirm({
      title: '警告',
      content: '删除后无法恢复，确定要删除该作品吗？',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: {
        style: {
          background: 'linear-gradient(96deg, #ff9a62, #ff5f00)',
          border: 'none',
          color: '#fff',
        },
      },
      async onOk() {
        try {
          await deleteBookById(bookDetail.id)
          message.success('删除成功')
          goTo('/workspace/writer')
        } catch {
          message.error('删除失败')
        }
      },
    })
  }

  const goBack = () => {
    window.history.back()
  }

  useEffect(() => {
    fetchBookDetail()
  }, [])

  return (
    <div className={styles.tower_con}>
      <div className={styles.serial_card}>
        <div className={styles.book_info_container}>
          {/* 返回 + 标题 */}
          <div className={styles.book_info_header_back} onClick={goBack}>
            <svg className="icon-left" width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 20.2839 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z"
              />
            </svg>
            {bookDetail.title}
          </div>

          {/* Tabs */}
          <div className={styles.book_info_tabs}>
            <div
              className={`${styles.book_info_tabs_item} ${type === 1 ? styles.tab_active : ''}`}
              onClick={() => setType(1)}
            >
              作品信息
            </div>
            <div
              className={`${styles.book_info_tabs_item} ${type === 2 ? styles.tab_active : ''}`}
              onClick={() => setType(2)}
            >
              签约管理
            </div>
            <div
              className={`${styles.book_info_tabs_item} ${type === 3 ? styles.tab_active : ''}`}
              onClick={() => setType(3)}
            >
              福利信息
            </div>
          </div>

          {/* 作品信息 Tab 内容 - 完全按照你提供的样式重做 */}
          {type === 1 && (
            <div className={styles.noveledit}>
              {/* 左侧封面 */}
              <div className={styles.pic}>
                <img src={bookDetail.cover_url} alt="书籍封面" />
              </div>

              {/* 右侧信息列表 */}
              <div className={styles.item}>
                <span className={styles.span}>书本名称</span>
                <div className={styles.txt}>{bookDetail.title || '-'}</div>
              </div>

              <div className={styles.item}>
                <span className={styles.span}>目标读者</span>
                <div className={styles.txt}>{bookDetail.target_readers || '-'}</div>
              </div>

              <div className={styles.item}>
                <span className={styles.span}>标签</span>
                <div className={styles.txt}>{bookDetail.tags || '-'}</div>
              </div>

              <div className={styles.item}>
                <span className={styles.span}>主角名</span>
                <div className={styles.txt}>{bookDetail.main_roles || '-'}</div>
              </div>

              <div className={styles.item}>
                <span className={styles.span}>作品简介</span>
                <textarea className={styles.txt} readOnly value={bookDetail.intro || ''} />
              </div>

              {/* 操作按钮（右下角） */}
              <div className={styles.btn}>
                <span className={styles.btn1} onClick={handleDeleteBook}>
                  删除作品
                </span>
                <span className={styles.btn1}>申请完结</span>
                <span className={styles.btn2} onClick={() => goTo(`/workspace/writer/update-book/${bookDetail.id}`)}>
                  修改作品
                </span>
              </div>
            </div>
          )}

          {/* 签约管理 */}
          {type === 2 && (
            <div className={styles.sign_manage_container}>
              {/* 签约说明 */}
              <div className={styles.sign_explain}>
                <h3 className={styles.section_title}>签约说明</h3>
                <ul className={styles.explain_list}>
                  <li>
                    作品字数达到2万字或被编辑提签后，将获得申请签约资格； 详见
                    <a href="#" className={styles.link}>
                      《签约问题全解》
                    </a>
                  </li>
                  <li>
                    签约作品可被用户在番茄小说等平台查看，在一定字数后获得全平台推荐，并享有广告分成、全勤奖等各种收益；
                    详见
                    <a href="#" className={styles.link}>
                      《番茄作家福利》
                    </a>
                  </li>
                </ul>
              </div>

              {/* 分隔线 */}
              <div className={styles.divider} />

              {/* 签约流程 */}
              <div className={styles.sign_process}>
                <h3 className={styles.section_title}>签约流程</h3>
                <ul className={styles.process_list}>
                  <li>暂未达到签约申请条件</li>
                </ul>
                <div className={styles.tip_text}>
                  作品总字数达到2万字后，将获得申请签约资格，优质作品可以更快速地被编辑发现。
                </div>
              </div>
            </div>
          )}

          {/* 福利信息 */}
          {type === 3 && (
            <div className={styles.welfare_empty_container}>
              <div className={styles.author_empty}>
                <img src="/src/assets/images/workspace/writer/empty.png" alt="暂无数据" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <FooterCopyright />
    </div>
  )
}

export default BookOverview
