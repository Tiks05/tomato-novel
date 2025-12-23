import { useState } from 'react'
import { message } from 'antd'
import { useGoTo } from '@/hooks/use-go-to'
import { useUserStore } from '@/store/use-user-store'
import { createBookInfo } from '@/api/workspace.api'
import FooterCopyright from '@/pages/WorkspaceWriter/components/FooterCopyright'
import styles from './CreateBook.module.scss'

const CreateBook = () => {
  const { goTo } = useGoTo()
  const userStore = useUserStore()

  const [coverPreview, setCoverPreview] = useState('/src/assets/images/workspace/writer/default_cover.png')
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const [name, setName] = useState('')
  const [readerType, setReaderType] = useState('1')
  const [tag, setTag] = useState('科幻末世')
  const [hero1, setHero1] = useState('')
  const [hero2, setHero2] = useState('')
  const [introduction, setIntroduction] = useState('')

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCoverFile(file)

    const reader = new FileReader()
    reader.onload = () => {
      setCoverPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const submitCreate = async () => {
    if (!name.trim()) return message.warning('请输入书名')
    if (!introduction.trim()) return message.warning('请输入简介')

    const formData = new FormData()
    formData.append('id', String(userStore.id()))
    formData.append('name', name.trim())
    formData.append('reader_type', readerType)
    formData.append('tag', tag)
    formData.append('hero1', hero1.trim())
    formData.append('hero2', hero2.trim())
    formData.append('introduction', introduction.trim())

    if (coverFile) {
      formData.append('cover', coverFile)
    }

    try {
      await createBookInfo(formData)
      message.success('创建成功！')
      goTo('/workspace/writer')
    } catch (err) {
      console.error(err)
      message.error('创建失败，请稍后重试')
    }
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className={styles['tower_con']}>
      <div className={styles['serial-card']}>
        <div className={styles['book-info-container']}>
          <div className={styles['book-info-header-back']} onClick={goBack}>
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
            创建作品
          </div>
        </div>

        <div className={styles['noveledit']}>
          {/* 封面 */}
          <div className={styles['pic']}>
            <img src={coverPreview} alt="封面图" />
            <span>
              选择封面
              <input type="file" accept="image/*" onChange={handleCoverChange} />
            </span>
          </div>

          {/* 书名 */}
          <div className={styles['item']}>
            <div className={styles['span']}>
              <em>*</em>书本名称
            </div>
            <input className={styles['txt']} type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>

          {/* 读者 */}
          <div className={styles['item']}>
            <div className={styles['span']}>目标读者</div>
            <label>
              <input
                type="radio"
                name="pictype"
                className={styles['choes_dan']}
                value="1"
                checked={readerType === '1'}
                onChange={e => setReaderType(e.target.value)}
              />
              男频
            </label>
            <label>
              <input
                type="radio"
                name="pictype"
                className={styles['choes_dan']}
                value="2"
                checked={readerType === '2'}
                onChange={e => setReaderType(e.target.value)}
              />
              女频
            </label>
          </div>

          {/* 标签 */}
          <div className={styles['item']}>
            <div className={styles['span']}>作品标签</div>
            <select className={styles['txt']} value={tag} onChange={e => setTag(e.target.value)}>
              <option value="科幻末世">科幻末世</option>
              <option value="玄幻仙侠">玄幻仙侠</option>
              <option value="都市生活">都市生活</option>
              <option value="悬疑推理">悬疑推理</option>
            </select>
          </div>

          {/* 主角 */}
          <div className={styles['item']}>
            <div className={styles['span']}>主角名</div>
            <input
              className={`${styles['txt']} ${styles['txt2']}`}
              placeholder="请输入主角名1"
              value={hero1}
              onChange={e => setHero1(e.target.value)}
            />
            <input
              className={`${styles['txt']} ${styles['txt2']} ${styles['txt3']}`}
              placeholder="请输入主角名2"
              value={hero2}
              onChange={e => setHero2(e.target.value)}
            />
          </div>

          {/* 简介 */}
          <div className={styles['item']}>
            <div className={styles['span']}>作品简介</div>
            <textarea
              placeholder="请输入作品简介"
              value={introduction}
              onChange={e => setIntroduction(e.target.value)}
            />
          </div>

          {/* 按钮 */}
          <div className={styles['btn']}>
            <span className={styles['btn1']} onClick={goBack}>
              取消
            </span>
            <span className={styles['btn2']} onClick={submitCreate}>
              立即创建
            </span>
          </div>
        </div>
      </div>

      <FooterCopyright />
    </div>
  )
}

export default CreateBook
