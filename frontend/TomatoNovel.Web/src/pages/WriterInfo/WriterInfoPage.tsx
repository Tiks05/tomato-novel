import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import WriterHeader from '@/pages/WriterInfo/components/WriterHeader'
import WriterWorks from '@/pages/WriterInfo/components/WriterWorks'

import { getWriterHeader, getWriterWorks } from '@/api/writer-info.api'

const WriterInfoPage = () => {
  const { id } = useParams<{ id: string }>()

  const [writerHeader, setWriterHeader] = useState<any>(null)
  const [writerWorks, setWriterWorks] = useState<any>(null)

  const navMenus = [
    { path: '/home', label: '首页' },
    { path: '/library', label: '书库' },
    { path: '/bookshelf', label: '书架' },
    { path: '/writer', label: '作家专区' },
    { path: '/copyright', label: '版权专区' },
  ]

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const [headerRes, worksRes] = await Promise.all([getWriterHeader(id), getWriterWorks(id)])
        setWriterHeader(headerRes)
        setWriterWorks(worksRes)
      } catch (err) {
        console.error('获取作家详情失败:', err)
      }
    }

    fetchData()
  }, [id])

  return (
    <>
      {/* Header 内部自己处理点击跳转 */}
      <Header menus={navMenus} />

      {writerHeader && <WriterHeader writerHeader={writerHeader} />}
      {writerWorks && <WriterWorks writerWorks={writerWorks} />}

      <Footer />
    </>
  )
}

export default WriterInfoPage
