import { useGoTo } from '@/hooks/use-go-to'
import styles from './NotFoundPage.module.scss'
import { Button } from 'antd'

const NotFound = () => {
  const { goTo } = useGoTo()

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.errorCode}>404</div>

        <div className={styles.title}>页面走丢了</div>
        <div className={styles.desc}>可能被时空裂缝吞噬了... 或者该页面已被移除。</div>

        <Button className={styles.backBtn} onClick={() => goTo('/home')}>
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default NotFound
