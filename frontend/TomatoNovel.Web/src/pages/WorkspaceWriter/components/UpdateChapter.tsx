import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { message } from 'antd'

import { useGoTo } from '@/hooks/use-go-to'
import { getChapterDetailById, updateChapter } from '@/api/workspace.api'

import styles from './UpdateChapter.module.scss'

const UpdateChapter = () => {
  const { goTo } = useGoTo()
  const { bookId, chapterId } = useParams()

  const [volumeIndex, setVolumeIndex] = useState(1)
  const [volumeTitle, setVolumeTitle] = useState('')
  const [chapterNumber, setChapterNumber] = useState('')
  const [chapterTitle, setChapterTitle] = useState('')
  const [chapterContent, setChapterContent] = useState('')

  // 返回
  const goBack = () => {
    window.history.back()
  }

  // 初始化加载章节
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await getChapterDetailById({
          book_id: Number(bookId),
          chapter_id: Number(chapterId),
        })

        if (res) {
          setVolumeIndex(res.volume_index)
          setVolumeTitle(res.volume_title)
          setChapterNumber(String(res.chapter_num))
          setChapterTitle(res.title)
          setChapterContent(res.content)
        }
      } catch (err) {
        console.error('章节加载失败', err)
        message.error('加载章节失败')
      }
    }

    fetchChapter()
  }, [bookId, chapterId])

  // 存草稿（仅保留逻辑）
  const handleSaveDraft = () => {
    console.log('保存草稿：', {
      book_id: Number(bookId),
      chapter_id: Number(chapterId),
      chapter_num: chapterNumber,
      title: chapterTitle,
      content: chapterContent,
      is_draft: true,
    })
  }

  // 提交更新
  const handleUpdate = async () => {
    const content = chapterContent.trim()

    if (!chapterTitle || !content || !chapterNumber) {
      message.warning('请填写完整的章节信息')
      return
    }

    if (content.length < 1000) {
      message.warning(`章节内容不得少于 1000 字，当前 ${content.length} 字`)
      return
    }

    const payload = {
      book_id: Number(bookId),
      chapter_id: Number(chapterId),
      chapter_num: Number(chapterNumber),
      title: chapterTitle,
      content,
      word_count: content.length,
      is_draft: false,
    }

    try {
      await updateChapter(payload)
      message.success('章节更新成功')
      goTo('/workspace/writer')
    } catch (err) {
      console.error('更新失败', err)
      message.error('章节更新失败')
    }
  }

  // 阿拉伯数字转中文
  const toChineseNumber = (num: number): string => {
    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    if (num <= 10) return chars[num]
    if (num < 20) return `十${chars[num % 10]}`
    if (num < 100) {
      const tens = Math.floor(num / 10)
      const units = num % 10
      return `${chars[tens]}十${units === 0 ? '' : chars[units]}`
    }
    return String(num)
  }

  const volumeIndexCN = toChineseNumber(volumeIndex)

  return (
    <div className={styles.bg_hui}>
      {/* 顶部栏 */}
      <div className={styles.publish_header}>
        <div className={styles.left}>
          <div className={styles.pic} onClick={goBack}>
            <svg
              className="serial-icon serial-icon-general_arrow1_left icon-left"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 19.8934 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z"
              />
            </svg>
          </div>

          <div className={styles.text}>
            <p>
              第{volumeIndexCN}卷：{volumeTitle}
            </p>
            <span>章节编号：第{chapterNumber}章</span>
          </div>
        </div>

        <div className={styles.right}>
          <span className={styles.btn1} onClick={handleSaveDraft}>
            存草稿
          </span>
          <span className={styles.btn2} onClick={handleUpdate}>
            提交
          </span>
        </div>
      </div>

      <div className={styles.h70} />

      {/* 编辑区域 */}
      <div className={styles.edit_con}>
        <div className={styles.tit}>
          <span>第</span>
          <input
            type="text"
            className={styles.one}
            value={chapterNumber}
            onChange={e => setChapterNumber(e.target.value)}
          />
          <span>章</span>
          <input
            type="text"
            className={styles.two}
            value={chapterTitle}
            placeholder="请输入标题"
            onChange={e => setChapterTitle(e.target.value)}
          />
        </div>

        <textarea value={chapterContent} placeholder="请输入内容" onChange={e => setChapterContent(e.target.value)} />
      </div>
    </div>
  )
}

export default UpdateChapter
