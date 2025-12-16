import { useGoTo } from '@/hooks/use-go-to'
import styles from './WriterWorks.module.scss'

const WriterWorks = ({ writerWorks }: any) => {
  const { goTo } = useGoTo()

  return (
    <div className={styles.bg_bai}>
      <div className={styles.bookindex_wp}>
        <div className={styles['author-wroks']}>
          <div className={styles['header-title']}>全部作品（{writerWorks.works.length}）</div>

          <div className={styles.line1}></div>

          {writerWorks.works.map((item: any, i: number) => (
            <div className={styles['book-item']} key={i} onClick={() => goTo(item.bookinfo_path)}>
              <div className={styles.cover}>
                <img src={item.cover_url} alt="" />
              </div>

              <div className={styles.content}>
                <h2 className={styles.title}>{item.title}</h2>
                <div className={styles.status}>{item.tags}</div>
                <div className={styles.desc1}>{item.intro}</div>

                <div className={styles.desc2}>
                  <span className={styles.clickable}>
                    最近更新：{item.max_chapter_title || '无最新章节'}
                    <i className={`muyeicon-enter ${styles.clickable}`}></i>
                  </span>

                  <span className={styles.time}>
                    {item.updated_at ? item.updated_at.replace('T', ' ').slice(0, 16) : ''}
                  </span>
                </div>
              </div>

              <div className={styles.right}>
                <div>
                  <span className={styles.big}>{(item.word_count / 10000).toFixed(1)}</span>
                  <span className={styles.text1}>万字</span>
                </div>

                <div className={styles.btn}>书籍详情</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WriterWorks
