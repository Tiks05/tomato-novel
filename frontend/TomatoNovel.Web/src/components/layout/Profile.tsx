import { useState, useMemo } from 'react'
import type { ChangeEvent } from 'react'
import { Button, message } from 'antd'

import Header from '@/components/layout/Header'
import { useUserStore } from '@/store/use-user-store'
import { useGoTo } from '@/hooks/use-go-to'
import { applyAsAuthor } from '@/api/layout.api'

import styles from './Profile.module.scss'

const Layout = () => {
  const { goTo } = useGoTo()
  const userStore = useUserStore()

  const [name, setName] = useState(userStore.nickname())
  const [introduction, setIntroduction] = useState(userStore.signature())

  const [apply, setApply] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const [previewAvatar, setPreviewAvatar] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  // -----------------------------
  // 头像上传
  // -----------------------------
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

  // -----------------------------
  // 协议勾选
  // -----------------------------
  const toggleApply = () => {
    setHasInteracted(true)
    setApply(prev => !prev)
  }

  // -----------------------------
  // 是否可提交
  // -----------------------------
  const canSubmit = useMemo(() => {
    return name.trim() !== '' && introduction.trim().length >= 10 && apply === true
  }, [name, introduction, apply])

  // -----------------------------
  // 提交
  // -----------------------------
  const submitApply = async () => {
    const formData = new FormData()

    // -----------------------------
    // 基础字段（一定会传）
    // -----------------------------
    formData.append('id', String(userStore.id()))
    formData.append('name', name.trim())
    formData.append('introduction', introduction.trim())

    // -----------------------------
    // 头像：只在用户选了新头像时才传
    // -----------------------------
    if (avatarFile instanceof File) {
      formData.append('avatar', avatarFile)
    }

    try {
      const res = await applyAsAuthor(formData)

      // -----------------------------
      // 同步更新前端用户态
      // -----------------------------
      userStore.setUser({
        user: {
          ...userStore.user!,
          avatar: res.avatar, // 后端最终头像（新 or 旧）
          nickname: res.nickname,
          signature: res.signature,
        },
        access_token: userStore.authToken()!, // 非空断言
      })

      message.success('修改个人信息成功！')
      goTo('/home')
    } catch (err) {
      console.error('修改失败:', err)
      message.error('修改失败，请稍后重试')
    }
  }

  const navMenus: any[] = []

  return (
    <>
      {navMenus && <Header menus={navMenus} />}

      <div className={styles.authorwriter}>
        <div className={styles.author}>
          <div className={styles.mass}>
            <img src="/src/assets/images/layout/profile/bg-1.png" alt="提示图" />
            <div className={styles.text}>
              <h5>完善你的个人资料，让更多人了解你</h5>
              <p>1. 昵称、头像和简介将展示在你的个人主页；2. 好的个人资料能让你脱颖而出，吸引更多关注</p>
            </div>
          </div>

          <div className={styles.fill_in}>
            {/* 头像 */}
            <div className={styles.item}>
              <div className={styles.span}>
                <b>*</b>修改头像
              </div>
              <div className={styles.up_pic}>
                <img src={previewAvatar || userStore.avatar()} alt="用户头像" />
                <div className={styles.btn}>
                  上传头像
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
              </div>
            </div>

            {/* 昵称 */}
            <div className={styles.item}>
              <div className={styles.span}>
                <b>*</b>昵称
              </div>
              <div className={styles.input}>
                <input
                  maxLength={10}
                  type="text"
                  placeholder="请勿使用特殊符号或有明显营销推广意图的名称"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <div className={styles.num}>{name.length} / 10</div>
              </div>
            </div>

            {/* 简介 */}
            <div className={styles.item}>
              <div className={styles.span}>
                <b>*</b>个人简介
              </div>
              <div className={styles.input}>
                <input
                  maxLength={30}
                  type="text"
                  placeholder="10-30字，写点有趣的介绍，让大家更了解你～"
                  value={introduction}
                  onChange={e => setIntroduction(e.target.value)}
                />
                <div className={styles.num}>{introduction.length} / 30</div>
              </div>
            </div>

            {/* 协议 */}
            <div className={styles.apply} onClick={toggleApply}>
              <div className={`${styles.icon} ${apply ? styles.on : ''}`} />
              <p>
                我已阅读并同意<a href="#">《个人信息保护声明》</a>
              </p>
            </div>

            {hasInteracted && !apply && <p className={styles['error-tip']}>请阅读并同意《个人信息保护声明》</p>}

            {/* 提交 */}
            <div className={styles.submit}>
              <Button
                className={`${styles['submit-btn']} ${canSubmit ? styles.active : ''}`}
                style={{
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  pointerEvents: canSubmit ? 'auto' : 'none',
                }}
                onClick={canSubmit ? submitApply : undefined}
              >
                确认修改
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
