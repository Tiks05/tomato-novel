import { useEffect, useRef, useState, useMemo } from 'react'
import styles from './BookList.module.scss'

import { useGoTo } from '@/hooks/use-go-to'
import { getAdaptList } from '@/api/common.api'

const BookList = () => {
  const { goTo } = useGoTo()

  const [adaptlist, setAdaptlist] = useState<any[]>([])

  // 获取后端数据
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdaptList({ limit: 22 })
      const list = Array.isArray(res) ? res : res.data
      setAdaptlist(list)
    }

    fetchData()
  }, [])

  // 视差相关
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)

  const moveStrength = 180
  const smoothness = 60

  const contentStyle = useMemo(() => {
    const offsetX = (mouseX - 0.5) * -moveStrength
    const offsetY = (mouseY - 0.5) * -moveStrength
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      transition: `transform ${smoothness}ms ease-out`,
    }
  }, [mouseX, mouseY])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()

    setMouseX((e.clientX - rect.left) / rect.width)
    setMouseY((e.clientY - rect.top) / rect.height)
  }

  return (
    <div className={styles.index_booklist}>
      <div className={styles.booklist_con} ref={containerRef} onMouseMove={handleMouseMove} style={contentStyle}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.dong_list} ${i % 2 === 1 ? styles.dong_list_on : ''}`}>
            {Array.from({ length: 3 }).map((_, j) => {
              const item = adaptlist[i * 3 + j]
              if (!item) return null

              return (
                <div className={styles.item} key={j}>
                  <div className={styles.pic} onClick={() => goTo(item.path)}>
                    <img src={item.pic} alt="" />
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookList
