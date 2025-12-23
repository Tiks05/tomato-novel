import { useEffect, useState } from 'react'
import { Modal, message, Input } from 'antd'
import { useParams } from 'react-router-dom'
import { useGoTo } from '@/hooks/use-go-to'
import {
  getChapterListByBookId,
  deleteChapterById,
  deleteVolumeById,
  createVolume,
  updateVolume,
} from '@/api/workspace.api'

import styles from './ChapterManage.module.scss'
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'

/* ================================
 * 单行章节
 * ================================ */
const ChapterRow = ({
  chapter,
  bookId,
  goTo,
  onDelete,
  statusMap,
}: {
  chapter: any
  bookId: string | undefined
  goTo: (path: string) => void
  onDelete: (id: number) => void
  statusMap: Record<string, string>
}) => {
  return (
    <tr>
      <td>{chapter.title}</td>
      <td>{chapter.word_count}</td>
      <td>{chapter.typo_count || 0}</td>
      <td>{statusMap[chapter.status] || chapter.status_text || '未知'}</td>
      <td>{chapter.updated_at}</td>
      <td>
        <span
          className={`${styles.btn} ${styles.btn1}`}
          onClick={() => goTo(`/workspace/writer/edit-chapter/${bookId}/${chapter.id}`)}
        />
        <span className={`${styles.btn} ${styles.btn2}`} onClick={() => onDelete(chapter.id)} />
      </td>
    </tr>
  )
}

const ChapterManage = () => {
  const { goTo } = useGoTo()
  const { bookId } = useParams<{ bookId: string }>()

  const [bookTitle, setBookTitle] = useState('')
  const [volumeList, setVolumeList] = useState<any[]>([])
  const [chapters, setChapters] = useState<any[]>([])

  const [filters, setFilters] = useState({
    volumeId: '',
    status: '',
    title: '',
  })

  const [showVolumeDialog, setShowVolumeDialog] = useState(false)
  const [tempVolumeList, setTempVolumeList] = useState<any[]>([])

  /* 审核状态映射 */
  const statusMap: Record<string, string> = {
    published: '已发布',
    reviewing: '审核中',
    rejected: '审核不通过',
    pending: '待发布',
    draft: '草稿',
  }

  /* 数字转中文 */
  const toChineseNumber = (num: number) => {
    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    if (num <= 10) return chars[num]
    if (num < 20) return num === 10 ? '十' : '十' + chars[num % 10]
    const tens = Math.floor(num / 10)
    const units = num % 10
    return chars[tens] + '十' + (units === 0 ? '' : chars[units])
  }

  /* 拉取章节列表 */
  const fetchList = async () => {
    const res = await getChapterListByBookId({
      book_id: Number(bookId),
      volume_id: filters.volumeId || undefined,
      status: filters.status || undefined,
      title: filters.title || undefined,
    })

    setBookTitle(res.title)
    setVolumeList(res.volumes)
    setChapters(res.list.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))
  }

  useEffect(() => {
    fetchList()
  }, [filters])

  /* 新建章节 */
  const handleCreateChapter = () => {
    if (!filters.volumeId) {
      message.warning('请先选择一个分卷再创建章节')
      return
    }
    goTo(`/workspace/writer/create-chapter/${bookId}?volume_id=${filters.volumeId}`)
  }

  /* 删除章节 */
  const handleDeleteChapter = (id: number) => {
    Modal.confirm({
      title: '警告',
      content: '确定要删除该章节吗？删除后不可恢复！',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteChapterById(id)
        message.success('删除成功')
        fetchList()
      },
    })
  }

  /* ===== 分卷管理 ===== */

  const openVolumeDialog = () => {
    setTempVolumeList(volumeList.map(v => ({ ...v, isEditing: false })))
    setShowVolumeDialog(true)
  }

  const addVolume = () => {
    setTempVolumeList(prev => [
      ...prev.map(v => ({ ...v, isEditing: false })),
      {
        id: `temp-${Date.now()}`,
        book_id: Number(bookId),
        title: '',
        sort: prev.length + 1,
        isEditing: true,
      },
    ])
  }

  const confirmEditVolume = async (index: number) => {
    const v = tempVolumeList[index]

    let title = v.title?.trim()
    if (!title) {
      title = `第${toChineseNumber(index + 1)}卷`
    }

    try {
      if (String(v.id).startsWith('temp-')) {
        await createVolume({
          book_id: Number(bookId),
          title,
          sort: index + 1,
        })
        message.success('新建成功')
      } else {
        await updateVolume({
          id: v.id,
          book_id: Number(bookId),
          title,
        })
        message.success('修改成功')
      }

      setShowVolumeDialog(false)
      await fetchList()
    } catch (err) {
      console.error(err)
      message.error('保存失败')
    }
  }

  const cancelEditVolume = (index: number) => {
    const v = tempVolumeList[index]
    if (String(v.id).startsWith('temp-')) {
      setTempVolumeList(prev => prev.filter((_, i) => i !== index))
    } else {
      const origin = volumeList.find(item => item.id === v.id)
      if (origin) v.title = origin.title
      v.isEditing = false
      setTempVolumeList([...tempVolumeList])
    }
  }

  const deleteVolume = (index: number) => {
    const volume = tempVolumeList[index]
    Modal.confirm({
      title: '警告',
      content: `确定要删除“${volume.title}”吗？该分卷下所有章节也将一并删除！`,
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteVolumeById(Number(bookId), volume.id)
        message.success('删除成功')
        setTempVolumeList(prev => prev.filter((_, i) => i !== index))
        fetchList()
      },
    })
  }

  const getChapterCount = (volumeId: number) => chapters.filter(c => c.volume_id === volumeId).length

  return (
    <div className={styles.tower_con}>
      <div className={styles['serial-card']}>
        <div className={styles['book-info-container']}>
          {/* 顶部 - 完整箭头 */}
          <div className={styles['book-info-header-back']} onClick={() => window.history.back()}>
            <svg
              className="serial-icon serial-icon-general_arrow1_left icon-left"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 19.8934 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z"
              />
            </svg>
            {bookTitle || '未命名书籍'}
          </div>

          {/* 操作区 */}
          <div className={styles.headerRow}>
            <div className={styles['book-info-tabs']}>
              <div className={`${styles['book-info-tabs-item']} ${styles['tab-active']}`}>章节管理</div>
            </div>

            <div className={styles.rightBtns}>
              <button onClick={openVolumeDialog}>编辑分卷</button>
              <button className={styles.add} onClick={handleCreateChapter}>
                新建章节
              </button>
            </div>
          </div>

          {/* 筛选 */}
          <div className={styles.noveladmin}>
            <div className={styles.doing}>
              <div className={styles.ll}>
                <div className={styles.item}>
                  <select
                    value={filters.volumeId}
                    onChange={e =>
                      setFilters(f => ({
                        ...f,
                        volumeId: e.target.value,
                      }))
                    }
                  >
                    <option value="">全部分卷</option>
                    {volumeList.map((v, i) => (
                      <option key={v.id} value={v.id}>
                        第{toChineseNumber(i + 1)}卷：{v.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.item}>
                  <span>审核状态</span>
                  <select
                    className={styles.select2}
                    value={filters.status}
                    onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="">全部</option>
                    <option value="published">已发布</option>
                    <option value="reviewing">审核中</option>
                    <option value="rejected">审核不通过</option>
                    <option value="pending">待发布</option>
                  </select>
                </div>
              </div>

              <div className={styles.seach}>
                <svg
                  className="serial-icon serial-icon-general_search"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5 4C9.14873 4 4 9.14873 4 15.5C4 21.8513 9.14873 27 15.5 27C18.3156 27 20.8949 25.9881 22.894 24.3082L26.2929 27.7071C26.6834 28.0976 27.3166 28.0976 27.7071 27.7071C28.0976 27.3166 28.0976 26.6834 27.7071 26.2929L24.3082 22.894C25.9881 20.8949 27 18.3156 27 15.5C27 9.14873 21.8513 4 15.5 4ZM6 15.5C6 10.2533 10.2533 6 15.5 6C20.7467 6 25 10.2533 25 15.5C25 20.7467 20.7467 25 15.5 25C10.2533 25 6 20.7467 6 15.5Z"
                  />
                </svg>
                <input
                  placeholder="搜索章节"
                  value={filters.title}
                  onChange={e => setFilters(f => ({ ...f, title: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && fetchList()}
                />
              </div>
            </div>

            {/* 表格 */}
            <table>
              <thead>
                <tr>
                  <th>章节名称</th>
                  <th>字数</th>
                  <th>错别字</th>
                  <th>审核状态</th>
                  <th>发布时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map(c => (
                  <ChapterRow
                    key={c.id}
                    chapter={c}
                    bookId={bookId}
                    goTo={goTo}
                    onDelete={handleDeleteChapter}
                    statusMap={statusMap}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 分卷弹窗 */}
      <Modal
        open={showVolumeDialog}
        title="分卷"
        centered
        width={500}
        footer={null}
        onCancel={() => setShowVolumeDialog(false)}
        closeIcon={null}
      >
        <div className={styles.volumeList}>
          {tempVolumeList.map((v, i) => (
            <div key={v.id} className={styles['volume-item']}>
              {v.isEditing ? (
                <div className={styles['title-editing']}>
                  <Input
                    value={v.title}
                    onChange={e => {
                      v.title = e.target.value
                      setTempVolumeList([...tempVolumeList])
                    }}
                    maxLength={20}
                    placeholder="请输入分卷标题"
                    className={styles.volumeInput}
                  />
                  <div className={styles.info}>{v.title.length}/20</div>
                  <div className={styles.action}>
                    <CheckOutlined className={styles.icon} onClick={() => confirmEditVolume(i)} />
                    <CloseOutlined className={styles.icon} onClick={() => cancelEditVolume(i)} />
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.title}>
                    第{toChineseNumber(i + 1)}卷：{v.title}
                  </div>
                  <div className={styles.info}>{getChapterCount(v.id)}/20</div>
                  <div className={styles.action}>
                    <span
                      className={`${styles.btn} ${styles.btn1}`}
                      onClick={() => {
                        v.isEditing = true
                        setTempVolumeList([...tempVolumeList])
                      }}
                    />
                    <span className={`${styles.btn} ${styles.btn2}`} onClick={() => deleteVolume(i)} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles['dialog-footer']}>
          <div className={styles['left-section']} onClick={addVolume}>
            <PlusOutlined style={{ marginRight: 6 }} />
            <span>新建分卷</span>
          </div>
          <div className={styles['right-section']}>
            <button onClick={() => setShowVolumeDialog(false)}>取消</button>
            <button className={styles.primary} onClick={() => setShowVolumeDialog(false)}>
              确定
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ChapterManage
