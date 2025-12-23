import { useEffect, useState } from 'react'
import { message } from 'antd'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGoTo } from '@/hooks/use-go-to'
import {
  getLastChapterByVolumeId,
  getLastChapterByBookId,
  getLatestChapterByBookId,
  createChapter,
} from '@/api/workspace.api'
import styles from './CreateChapter.module.scss'

const CreateChapter = () => {
  const { goTo } = useGoTo()
  const { bookId } = useParams()
  const [searchParams] = useSearchParams()

  const volumeId = Number(searchParams.get('volume_id') || 0)

  // 输入内容
  const [chapterTitle, setChapterTitle] = useState('')
  const [chapterContent, setChapterContent] = useState('')
  const [chapterNumber, setChapterNumber] = useState('')

  // 上次章节信息
  const [volumeTitle, setVolumeTitle] = useState('')
  const [currentVolumeId, setCurrentVolumeId] = useState(0)
  const [lastVolumeId, setLastVolumeId] = useState(0)
  const [lastVolumeTitle, setLastVolumeTitle] = useState('')
  const [lastChapter, setLastChapter] = useState(0)
  const [lastChapterTitle, setLastChapterTitle] = useState('')
  const [lastUpdatedTime, setLastUpdatedTime] = useState('')

  // 最新章节
  const [latestVolumeSort, setLatestVolumeSort] = useState(0)
  const [latestChapterNum, setLatestChapterNum] = useState(0)
  const [latestChapterTitle, setLatestChapterTitle] = useState('')
  const [latestChapterUpdateTime, setLatestChapterUpdateTime] = useState('')

  const goBack = () => window.history.back()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res: any

        if (volumeId) {
          res = await getLastChapterByVolumeId(Number(bookId), volumeId)
          setVolumeTitle(res.volume_title || '')
          setCurrentVolumeId(res.current_volume_id || 0)
        } else {
          res = await getLastChapterByBookId(Number(bookId))
        }

        if (res) {
          setLastVolumeId(res.last_volume_id || 0)
          setLastVolumeTitle(res.last_volume_title || '')
          setLastChapter(res.chapter_index || 0)
          setLastChapterTitle(res.chapter_title || '')
          setLastUpdatedTime(res.updated_at || '')
        }

        const latestRes = await getLatestChapterByBookId(Number(bookId))
        if (latestRes) {
          setLatestVolumeSort(latestRes.latest_volume_sort || 0)
          setLatestChapterNum(latestRes.latest_chapter_num || 0)
          setLatestChapterTitle(latestRes.latest_chapter_title || '')
          setLatestChapterUpdateTime(latestRes.latest_chapter_updated_at || '')
        }
      } catch (err) {
        console.error('获取章节信息失败', err)
      }
    }

    fetchData()
  }, [bookId, volumeId])

  // 数字转中文
  const numberToChinese = (num: number): string => {
    const cn = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const unit = ['', '十', '百', '千']
    if (num <= 10) return num === 10 ? '十' : cn[num]
    const digits = String(num)
      .split('')
      .map(n => Number(n))
    let res = ''
    digits.forEach((d, i) => {
      const pos = digits.length - i - 1
      if (d !== 0) res += cn[d] + unit[pos]
      else if (!res.endsWith('零')) res += '零'
    })
    return res.replace(/零+$/, '')
  }

  const handleSaveDraft = () => {
    console.log('📝 存草稿', {
      bookId,
      volumeId,
      chapterTitle,
      chapterContent,
    })
  }

  const confirm = async () => {
    const content = chapterContent.trim()

    if (!chapterTitle || !content) {
      message.warning('请填写完整的章节信息')
      return
    }

    if (content.length < 1000) {
      message.warning(`章节内容不得少于 1000 字，当前 ${content.length} 字`)
      return
    }

    try {
      await createChapter({
        book_id: Number(bookId),
        volume_id: volumeId,
        title: chapterTitle,
        content,
        word_count: content.length,
      })

      message.success('章节提交成功')
      goTo('/workspace/writer')
    } catch (err) {
      console.error('章节提交失败', err)
      message.error('章节提交失败')
    }
  }

  return (
    <div className={styles['bg_hui']}>
      {/* 顶部栏 */}
      <div className={styles['publish_header']}>
        <div className={styles['left']}>
          <div className={styles['pic']} onClick={goBack}>
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

          <div className={styles['text']}>
            {currentVolumeId && volumeTitle ? (
              <p>
                第{numberToChinese(currentVolumeId)}卷：{volumeTitle}
              </p>
            ) : lastVolumeId && lastVolumeTitle ? (
              <p>
                第{numberToChinese(lastVolumeId)}卷：{lastVolumeTitle}
              </p>
            ) : null}

            <span>
              最新章节：
              {latestChapterTitle ? (
                <>
                  第{numberToChinese(latestVolumeSort)}卷{latestChapterNum > 0 && <> 第{latestChapterNum}章</>}
                  {latestChapterTitle}（{latestChapterUpdateTime}）
                </>
              ) : (
                '无'
              )}
            </span>
          </div>
        </div>

        <div className={styles['right']}>
          <span className={styles['btn1']} onClick={handleSaveDraft}>
            存草稿
          </span>
          <span className={styles['btn2']} onClick={confirm}>
            提交
          </span>
        </div>
      </div>

      <div className={styles['h70']}></div>

      {/* 编辑区 */}
      <div className={styles['edit_con']}>
        <div className={styles['tit']}>
          <span>第</span>
          <input
            type="text"
            className={styles['one']}
            value={chapterNumber}
            onChange={e => setChapterNumber(e.target.value)}
          />
          <span>章</span>
          <input
            type="text"
            className={styles['two']}
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

export default CreateChapter
