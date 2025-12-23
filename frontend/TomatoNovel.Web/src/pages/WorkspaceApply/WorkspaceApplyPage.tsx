import { useState, useMemo } from 'react'
import type { ChangeEvent } from 'react'
import { Button, message } from 'antd'

import Header from '@/components/layout/Header'
import { useUserStore } from '@/store/use-user-store'
import { useGoTo } from '@/hooks/use-go-to'
import { applyAsAuthor } from '@/api/workspace.api'

import bgImg from '@/assets/images/workspace/apply/bg-1.png'
import checkedImg from '@/assets/images/workspace/apply/masked.png'

import styles from './WorkspaceApplyPage.module.scss'

const WorkspaceApplyPage = () => {
  const { goTo } = useGoTo()
  const userStore = useUserStore()

  const [name, setName] = useState(userStore.nickname())
  const [introduction, setIntroduction] = useState(userStore.signature())

  const [apply, setApply] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const [previewAvatar, setPreviewAvatar] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  // 头像上传
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setAvatarFile(file)

    const reader = new FileReader()
    reader.onload = () => {
      setPreviewAvatar(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // 协议勾选
  const toggleApply = () => {
    setHasInteracted(true)
    setApply(v => !v)
  }

  // 是否可提交
  const canSubmit = useMemo(() => {
    return name.trim() !== '' && introduction.trim().length >= 10 && apply === true
  }, [name, introduction, apply])

  // 提交
  const submitApply = async () => {
    const formData = new FormData()
    formData.append('id', String(userStore.id()))
    formData.append('name', name.trim())
    formData.append('introduction', introduction.trim())

    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }

    try {
      const res = await applyAsAuthor(formData)

      userStore.updateUser({
        avatar: res.avatar,
        nickname: res.nickname,
        role: 'author',
        become_author_at: res.become_author_at,
        signature: res.signature,
      })

      message.success('申请成功，欢迎成为作家！')
      goTo('/workspace/writer')
    } catch (err) {
      console.error(err)
      message.error('申请失败，请稍后重试')
    }
  }

  const navMenus = [
    { path: '/home', label: '番茄小说网' },
    { path: '/classroom', label: '作家课堂' },
    { path: '/benefit', label: '作家福利' },
  ]

  return (
    <>
      <Header menus={navMenus} />

      <div className={styles.authorwriter}>
        <div className={styles.author}>
          {/* 顶部提示 */}
          <div className={styles.mass}>
            <img src={bgImg} alt="提示图" />
            <div className={styles.text}>
              <h5>欢迎成为番茄小说作家，快来填写信息～</h5>
              <p>1. 作者信息会同步更新到番茄小说APP； 2. 优质的头像、笔名和简介，能够让读者更快记住你</p>
            </div>
          </div>

          <div className={styles.fill_in}>
            {/* 头像 */}
            <div className={styles.item}>
              <div className={styles.span}>
                <b>*</b>作家头像
              </div>
              <div className={styles.up_pic}>
                <img src={previewAvatar || userStore.avatar()} alt="用户头像" />
                <div className={styles.btn}>
                  上传头像
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
              </div>
            </div>

            {/* 笔名 */}
            <div className={styles.item}>
              <div className={styles.span}>
                <b>*</b>笔名
              </div>
              <div className={styles.input}>
                <input
                  maxLength={10}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="请勿使用特殊符号或有明显营销推广意图的名称"
                />
                <div className={styles.num}>{name.length} / 10</div>
              </div>
            </div>

            {/* 简介 */}
            <div className={styles.item}>
              <div className={styles.span}>
                <b>*</b>作家简介
              </div>
              <div className={styles.input}>
                <input
                  maxLength={30}
                  value={introduction}
                  onChange={e => setIntroduction(e.target.value)}
                  placeholder="10-30字，展示个人特色，写作经验，创作方向等"
                />
                <div className={styles.num}>{introduction.length} / 30</div>
              </div>
            </div>

            {/* 协议 */}
            <div className={styles.apply} onClick={toggleApply}>
              <div
                className={`${styles.icon} ${apply ? styles.on : ''}`}
                style={apply ? { backgroundImage: `url(${checkedImg})` } : undefined}
              />
              <p>
                我已阅读并同意<a>《个人信息保护声明》</a>
              </p>
            </div>

            {hasInteracted && !apply && <p className={styles['error-tip']}>请阅读并同意《个人信息保护声明》</p>}

            {/* 提交按钮 */}
            <div className={styles.submit}>
              <Button
                className={`${styles['submit-btn']} ${canSubmit ? styles.active : ''}`}
                style={{
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  pointerEvents: canSubmit ? 'auto' : 'none',
                }}
                onClick={canSubmit ? submitApply : undefined}
              >
                成为作家
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkspaceApplyPage
