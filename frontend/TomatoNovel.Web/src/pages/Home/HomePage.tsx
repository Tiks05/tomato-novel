import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import Banner from '@/components/common/Banner'
import HomeShortcut from '@/components/common/HomeShortcut'
import Adapt from '@/components/common/Adapt'
import BookList from '@/components/common/BookList'

import RankingList from './components/RankingList'
import NewsList from './components/NewsList'
import WriterList from './components/WriterList'
import Recommend from './components/Recommend'
import Sort from './components/Sort'
import Recently from './components/Recently'

import styles from './HomePage.module.scss'

const HomePage = () => {
  const navMenus = [
    { path: '/home', label: '首页' },
    { path: '/library', label: '书库' },
    { path: '/bookshelf', label: '书架' },
    { path: '/writer', label: '作家专区' },
    { path: '/copyright', label: '版权专区' },
  ]

  const shortcutList = [
    {
      title: '作家福利',
      desc: '番茄作家福利区',
      path: '/benefit',
    },
    {
      title: '作家专区',
      desc: '创建作品、查看作品数据及收益',
      path: '/writer',
    },
    {
      title: '版权专区',
      desc: '优秀版权作品展示',
      path: '/copyright',
    },
  ]

  return (
    <div className={styles.bg_bai}>
      {/* 头部 */}
      {navMenus && <Header menus={navMenus} />}

      {/* Banner */}
      <Banner />

      {/* 快捷入口 */}
      {shortcutList && <HomeShortcut shortcuts={shortcutList} />}

      <div className={styles.index_wrapper}>
        {/* 排行榜 + 资讯 */}
        <div className={styles.ranking_news_wrapper}>
          <RankingList />
          <NewsList />
        </div>

        {/* 作家 */}
        <WriterList />
      </div>

      {/* 精选 */}
      <Recommend />

      {/* 排行榜 */}
      <Sort />

      {/* 版权改编 */}
      <Adapt />

      {/* 更多书籍 */}
      <BookList />

      {/* 最新更新 */}
      <Recently />

      {/* 底部 */}
      <Footer />
    </div>
  )
}

export default HomePage
