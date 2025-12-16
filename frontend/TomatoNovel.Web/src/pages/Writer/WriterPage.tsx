import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import Banner from '@/components/common/Banner'
import HomeShortcut from '@/components/common/HomeShortcut'
import Adapt from '@/components/common/Adapt'
import BookList from '@/components/common/BookList'

import Active from './components/Active'
import Classroom from './components/Classroom'
import Talk from './components/Talk'

import {} from '@/api/writer.api'

import styles from './WriterPage.module.scss'

const WriterPage = () => {
  const navMenus = [
    { path: '/benefit', label: '作家福利' },
    { path: '/classroom', label: '作家课堂' },
    { path: '/help', label: '帮助中心' },
  ]

  const shortcutList = [
    {
      title: '全年/半年/季度奖',
      desc: '持续更新高额现金激励',
      path: '/welfare/yearly',
    },
    {
      title: '优质加更奖',
      desc: '优质作品进阶更新分成激励',
      path: '/welfare/quality',
    },
    {
      title: '新书追更奖',
      desc: '高追更新书分成激励',
      path: '/welfare/newbook',
    },
  ]

  return (
    <div className={styles.bg_bai}>
      <Header menus={navMenus} />

      <Banner />

      {/* 快捷入口 */}
      <HomeShortcut shortcuts={shortcutList} />

      <div className={styles.index_wrapper}>
        {/* 公告 / 活动 */}
        <Active />
      </div>

      {/* 作家课堂 */}
      <Classroom />

      {/* 版权改编 */}
      <Adapt />

      {/* 更多书籍 */}
      <BookList />

      {/* 作家有话说 */}
      <Talk />

      {/* 底部 */}
      <Footer />
    </div>
  )
}

export default WriterPage
