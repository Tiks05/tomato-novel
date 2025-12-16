import { useState } from 'react'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TypeList from './components/TypeList'
import BookList from './components/BookList'

import styles from './LibraryPage.module.scss'

const LibraryPage = () => {
  // 顶部导航菜单
  const navMenus = [
    { path: '/home', label: '首页' },
    { path: '/library', label: '书库' },
    { path: '/bookshelf', label: '书架' },
    { path: '/writer', label: '作家专区' },
    { path: '/copyright', label: '版权专区' },
  ]

  // 筛选条件
  const [filters, setFilters] = useState({
    reader_type: '',
    category_group: '',
    category_type: '',
    status: '',
    word_count_range: '',
  })

  // 接收 TypeList 更新
  const handleFilters = (val: typeof filters) => {
    setFilters(val)
  }

  return (
    <div className={styles.bg_bai}>
      {/* 头部 */}
      <div className={styles.header_con}>{navMenus && <Header menus={navMenus} />}</div>

      <div className={styles.library_wrapper}>
        {/* 类别选择 */}
        <TypeList onUpdateFilters={handleFilters} />

        {/* 列表 */}
        {filters && <BookList filters={filters} />}
      </div>

      {/* 底部 */}
      <Footer />
    </div>
  )
}

export default LibraryPage
