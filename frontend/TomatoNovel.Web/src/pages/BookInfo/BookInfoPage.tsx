import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BookHeader from '@/pages/BookInfo/components/BookHeader'
import BookContent from '@/pages/BookInfo/components/BookContent'

import { getBookHeader, getBookContent } from '@/api/book-info.api'

// 菜单配置
const navMenus = [
  { path: '/home', label: '首页' },
  { path: '/library', label: '书库' },
  { path: '/bookshelf', label: '书架' },
  { path: '/writer', label: '作家专区' },
  { path: '/copyright', label: '版权专区' },
]

const BookInfoPage = () => {
  const { id } = useParams()

  const [bookHeader, setBookHeader] = useState<any>(null)
  const [bookContent, setBookContent] = useState<any>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const [headerRes, contentRes] = await Promise.all([
          getBookHeader(id),
          getBookContent(id),
        ])

        setBookHeader(headerRes)
        setBookContent(contentRes)
      } catch (error) {
        console.error('获取书籍详情失败:', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <>
      <Header menus={navMenus} />

      {bookHeader && <BookHeader bookHeader={bookHeader} />}

      {bookContent && <BookContent bookContent={bookContent} />}

      <Footer />
    </>
  )
}

export default BookInfoPage
