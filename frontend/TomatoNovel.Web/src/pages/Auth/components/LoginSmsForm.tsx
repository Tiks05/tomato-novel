import { useState, useEffect } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { sendCode, loginByCode } from '@/api/auth.api'
import { useGoTo } from '@/hooks/use-go-to'
import { useUserStore } from '@/store/use-user-store'

import styles from './LoginSmsForm.module.scss'

const LoginSmsForm = () => {
  const { goTo } = useGoTo()
  const setUser = useUserStore(s => s.setUser)

  const [form] = Form.useForm()

  const [countdown, setCountdown] = useState(0)
  const [sending, setSending] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const phone = Form.useWatch('phone', form)
  const code = Form.useWatch('code', form)
  const agree = Form.useWatch('agree', form)

  const isPhoneValid = /^1[3-9]\d{9}$/.test(phone || '')
  const canSendCode = isPhoneValid && agree && countdown === 0
  const canSubmit = isPhoneValid && !!code && agree

  /** 倒计时逻辑 */
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => setCountdown(v => v - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  /** 发送验证码 */
  const handleSendCode = async () => {
    if (!canSendCode || sending) return
    try {
      setSending(true)
      await sendCode(phone)
      message.success('验证码已发送')
      setCountdown(60)
    } catch (err: any) {
      message.error(err?.message || '发送失败')
    } finally {
      setSending(false)
    }
  }

  /** 登录 */
  const handleLogin = async () => {
    if (!canSubmit || submitting) return
    try {
      setSubmitting(true)
      await form.validateFields()

      const res = await loginByCode(phone, code)
      setUser({ ...res.data.user, token: res.data.token })

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
        {/* 返回按钮 */}
        <div className={styles.backTab}>验证码登录</div>

        <Form form={form} layout="vertical" className={styles.smsForm}>
          {/* 手机号 */}
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
            ]}
          >
            <Input placeholder="请输入手机号" className={styles.inputRounded} />
          </Form.Item>

          {/* 验证码行 */}
          <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <div className={styles.codeLine}>
              <Input placeholder="请输入验证码" className={`${styles.inputRounded} ${styles.codeInput}`} />

              <Button className={styles.codeBtn} loading={sending} disabled={!canSendCode} onClick={handleSendCode}>
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Button>
            </div>
          </Form.Item>

          {/* 协议 */}
          <div className={styles.agreeLine}>
            <Form.Item name="agree" valuePropName="checked" noStyle>
              <Checkbox />
            </Form.Item>

            <span className={styles.agreeText}>
              我已阅读并同意 <a>用户协议</a> 和 <a>隐私政策</a>
            </span>
          </div>

          {/* 登录按钮（同 ResetPwdForm） */}
          <Button
            block
            className={`${styles.commonBtn} ${canSubmit ? styles.active : ''}`}
            loading={submitting}
            style={{
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              pointerEvents: canSubmit ? 'auto' : 'none',
            }}
            onClick={() => (canSubmit ? handleLogin() : null)}
          >
            登录 / 注册
          </Button>

          {/* 切换密码登录 */}
          <div className={styles.switchText} onClick={() => goTo('/login/pwd')}>
            密码登录
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginSmsForm
