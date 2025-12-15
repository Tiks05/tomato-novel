import { useEffect, useState } from 'react'
import styles from './Recently.module.scss'

import { useGoTo } from '@/hooks/use-go-to'
import { getRecentUpdates } from '@/api/home.api'

const Recently = () => {
  const [list, setList] = useState<any[]>([])
  const { goTo } = useGoTo()

  useEffect(() => {
    const fetchRecentUpdates = async () => {
      try {
        const res = await getRecentUpdates()
        setList(res)
      } catch (err) {
        console.error('获取最近更新失败', err)
      }
    }

    fetchRecentUpdates()
  }, [])

  return (
    <div className={styles.bg_hui}>
      <div className={styles.recently_wrapper}>
        <div className={styles.tit}>
          <h2>最近更新</h2>
        </div>

        <div className={styles.recently_list}>
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th>书名</th>
                <th>最新章节</th>
                <th>作者</th>
                <th>更新时间</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item, index) => (
                <tr key={index} onClick={() => goTo(item.path)}>
                  <td className={styles.one}>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.chapter}</td>
                  <td>{item.author}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Recently
