import { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useGoTo } from '@/hooks/use-go-to'

import styles from './ResetPwdForm.module.scss'
import arrowLeft from '@/assets/icons/arrow-left/icons8-arrow-50.png'

const ResetPwdForm = () => {
  const { goTo } = useGoTo()
  const [form] = Form.useForm()

  const [sending, setSending] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const account = Form.useWatch('account', form)
  const password = Form.useWatch('password', form)
  const confirm = Form.useWatch('confirm', form)
  const code = Form.useWatch('code', form)

  const canSendCode = Boolean(account?.trim())

  const canSubmit =
    Boolean(account?.trim() && password?.trim() && confirm?.trim() && code?.trim()) && password === confirm

  /** 发送验证码 */
  const handleSendCode = async () => {
    if (!canSendCode || sending) return
    try {
      setSending(true)
      message.success('验证码已发送（模拟）')
    } finally {
      setSending(false)
    }
  }

  /** 提交重置密码 */
  const handleSubmit = async () => {
    if (!canSubmit || submitting) return

    try {
      setSubmitting(true)
      await form.validateFields()

      message.success('密码已重置（模拟）')
      goTo('/login/pwd')
    } catch (err: any) {
      message.error(err?.message || '提交失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 返回按钮 */}
        <div className={styles.backTab} onClick={() => goTo('/login/pwd')}>
          <img src={arrowLeft} className={styles.backIcon} />
          密码重置
        </div>

        <Form form={form} layout="vertical" className={styles.resetForm}>
          {/* 账号 */}
          <Form.Item name="account" rules={[{ required: true, message: '请输入手机号/邮箱' }]}>
            <Input placeholder="请输入手机号/邮箱" className={styles.inputRounded} />
          </Form.Item>

          {/* 新密码 */}
          <Form.Item name="password" rules={[{ required: true, message: '请输入新密码' }]}>
            <Input.Password placeholder="请输入新密码" className={styles.inputRounded} />
          </Form.Item>

          {/* 确认密码 */}
          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === getFieldValue('password')) return Promise.resolve()
                  return Promise.reject('两次密码不一致')
                },
              }),
            ]}
          >
            <Input.Password placeholder="确认密码" className={styles.inputRounded} />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <div className={styles.codeLine}>
              <Input placeholder="请输入验证码" className={`${styles.inputRounded} ${styles.codeInput}`} />

              <Button className={styles.codeBtn} disabled={!canSendCode} loading={sending} onClick={handleSendCode}>
                获取验证码
              </Button>
            </div>
          </Form.Item>

          {/* 提交按钮 */}
          <Button
            block
            className={`${styles.commonBtn} ${canSubmit ? styles.active : ''}`}
            loading={submitting}
            style={{
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              pointerEvents: canSubmit ? 'auto' : 'none',
            }}
            onClick={() => (canSubmit ? handleSubmit() : null)}
          >
            提交
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ResetPwdForm
