import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/layout/Header'
import { useGoTo } from '@/hooks/use-go-to'

import styles from './WorkspaceWriterPage.module.scss'

const WorkspaceWriterPage = () => {
  const { goTo } = useGoTo()

  const [activeMenuIds, setActiveMenuIds] = useState<Set<number>>(new Set())
  const [nowId, setNowId] = useState<number>(1)

  const navMenus = [
    { path: '/home', label: '番茄小说网' },
    { path: '/classroom', label: '作家课堂' },
    { path: '/benefit', label: '作家福利' },
    { path: '/workspace/writer/notifications', label: '消息通知' },
  ]

  const menus = [
    {
      id: 1,
      path: '/workspace/writer',
      label: '工作台',
      pic: '/src/assets/icons/work/i1.png',
      pic2: '/src/assets/icons/work/i1_2.png',
      child: [],
    },
    {
      id: 2,
      label: '作品管理',
      pic: '/src/assets/icons/work/i2.png',
      pic2: '',
      child: [
        { id: 21, path: '/workspace/writer/novel', label: '小说' },
        { id: 22, path: '/workspace/writer/story', label: '短故事' },
      ],
    },
    {
      id: 3,
      label: '数据中心',
      pic: '/src/assets/icons/work/i3.png',
      pic2: '',
      child: [
        { id: 31, path: '/workspace/writer/noveldata', label: '小说数据' },
        { id: 32, path: '/workspace/writer/storydata', label: '短故事数据' },
      ],
    },
    {
      id: 4,
      label: '收益分析',
      pic: '/src/assets/icons/work/i4.png',
      pic2: '',
      child: [
        { id: 41, path: '/workspace/writer/novelincome', label: '小说收益' },
        { id: 42, path: '/workspace/writer/storyincome', label: '短故事稿费' },
      ],
    },
    {
      id: 5,
      label: '互动管理',
      pic: '/src/assets/icons/work/i5.png',
      pic2: '',
      child: [
        { id: 51, path: '/workspace/writer/comment', label: '评论管理' },
        { id: 52, path: '/workspace/writer/reward', label: '打赏管理' },
        { id: 53, path: '/workspace/writer/say', label: '有话说管理' },
        { id: 54, path: '/workspace/writer/fans', label: '粉丝管理' },
      ],
    },
    {
      id: 6,
      path: '/workspace/writer/inspiration',
      label: '开书灵感',
      pic: '/src/assets/icons/work/i6.png',
      pic2: '/src/assets/icons/work/i6_2.png',
      child: [],
    },
    {
      id: 7,
      label: '作品运营',
      pic: '/src/assets/icons/work/i7.png',
      pic2: '',
      child: [
        { id: 71, path: '/workspace/writer/newbook', label: '新书预热' },
        { id: 72, path: '/workspace/writer/booktitle', label: '口碑书名' },
      ],
    },
    {
      id: 8,
      path: '/workspace/writer/benefit',
      label: '福利管理',
      pic: '/src/assets/icons/work/i8.png',
      pic2: '/src/assets/icons/work/i8_2.png',
      child: [],
    },
    {
      id: 9,
      path: '/workspace/writer/level',
      label: '作家等级',
      pic: '/src/assets/icons/work/i9.png',
      pic2: '/src/assets/icons/work/i9_2.png',
      child: [],
    },
  ]

  const toggleMenu = (menuId: number) => {
    setActiveMenuIds(prev => {
      const next = new Set(prev)
      next.has(menuId) ? next.delete(menuId) : next.add(menuId)
      return next
    })
  }

  const isMenuActive = (menuId: number) => activeMenuIds.has(menuId)

  const goHover = (item: any) => {
    setNowId(item.id)
    item.path && goTo(item.path)
  }

  return (
    <div className={styles.pageBg}>
      <Header menus={navMenus} />

      <div className={styles.h64} />

      <div className={styles.index_wrapper}>
        {/* 左侧菜单 */}
        <div className={styles.AuthorWork_left}>
          <div className={styles.left_con}>
            {menus.map(item => (
              <div className={styles.item} key={item.id}>
                {item.child.length > 0 ? (
                  <div className={styles.tit} onClick={() => toggleMenu(item.id)}>
                    <div className={styles.icon}>
                      <img src={item.pic} alt="" />
                    </div>
                    {item.label}
                    <div className={`${styles.rr} ${isMenuActive(item.id) ? styles.on : ''}`}>
                      <img src="/src/assets/images/workspace/writer/x.png" alt="" />
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.tit} ${nowId === item.id ? styles.on : ''}`} onClick={() => goHover(item)}>
                    <div className={styles.icon}>
                      <img src={item.pic} className={styles.img1} />
                      <img src={item.pic2} className={styles.img2} />
                    </div>
                    {item.label}
                  </div>
                )}

                <div className={`${styles.down} ${isMenuActive(item.id) ? styles.open : ''}`}>
                  {item.child.map(sub => (
                    <div
                      key={sub.id}
                      className={`${styles.nav} ${nowId === sub.id ? styles.on : ''}`}
                      onClick={() => goHover(sub)}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧内容 */}
        <Outlet />
      </div>
    </div>
  )
}

export default WorkspaceWriterPage
