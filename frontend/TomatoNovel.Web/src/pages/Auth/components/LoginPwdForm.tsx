import { useState } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { loginByPassword } from '@/api/auth.api'
import { fetchTokenByPassword } from '@/utils/oauth'
import { useUserStore } from '@/store/use-user-store'
import { useGoTo } from '@/hooks/use-go-to'

import styles from './LoginPwdForm.module.scss'
import arrowLeft from '@/assets/icons/arrow-left/icons8-arrow-50.png'

const LoginPwdForm = () => {
  const { goTo } = useGoTo()

  const setUser = useUserStore(s => s.setUser)
  const setTokens = useUserStore(s => s.setTokens)

  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  /** 实时监听 */
  const account = Form.useWatch('account', form)
  const password = Form.useWatch('password', form)
  const agree = Form.useWatch('agree', form)

  const canSubmit = Boolean(account?.trim() && password?.trim() && agree)

  /** 登录逻辑（⭐ 企业标准写法） */
  const handleLogin = async () => {
    await form.validateFields()

    try {
      setSubmitting(true)

      const { account, password } = form.getFieldsValue()

      // ① 业务登录（只校验账号密码，拿 UserInfo）
      const user = await loginByPassword({
        phone: account,
        password,
      })

      // ② OAuth 登录（拿 access_token / refresh_token）
      const token = await fetchTokenByPassword(account, password)

      // ③ 写入 store
      setUser(user)
      setTokens({
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        expiresIn: token.expires_in,
      })

      message.success('登录成功')
      goTo('/home')
    } catch (err: any) {
      message.error(err?.message || '登录失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 返回 */}
        <div className={styles.backTab} onClick={() => goTo('/login/sms')}>
          <img src={arrowLeft} className={styles.backIcon} />
          密码登录
        </div>

        <Form form={form} layout="vertical" className={styles.loginForm}>
          <Form.Item name="account" rules={[{ required: true, message: '请输入手机号' }]}>
            <Input placeholder="请输入手机号" className={styles.inputRounded} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              type="password"
              placeholder="请输入密码"
              className={styles.inputRounded}
              suffix={
                <span className={styles.forgotText} onClick={() => goTo('/login/reset')}>
                  忘记密码
                </span>
              }
            />
          </Form.Item>

          <div className={styles.agreeLine}>
            <Form.Item name="agree" valuePropName="checked" noStyle>
              <Checkbox />
            </Form.Item>

            <span className={styles.agreeText}>
              我已阅读并同意 <a>用户协议</a> 和 <a>隐私政策</a>
            </span>
          </div>

          <Button
            className={`${styles.loginBtn} ${canSubmit ? styles.active : ''}`}
            style={{
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              pointerEvents: canSubmit ? 'auto' : 'none',
            }}
            loading={submitting}
            onClick={canSubmit ? handleLogin : undefined}
          >
            登录
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default LoginPwdForm
