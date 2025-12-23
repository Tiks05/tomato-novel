import { useEffect, useState } from 'react'
import styles from './TypeList.module.scss'

const TypeList = ({ onUpdateFilters }: any) => {
  const typelist = {
    readers: [
      { id: 0, title: '全部' },
      { id: 1, title: '男生' },
      { id: 2, title: '女生' },
    ],
    classify: [
      {
        id: 0,
        title: '全部',
        group: '',
        child: [],
      },
      {
        id: 1,
        title: '主题',
        group: 'theme_type',
        child: [
          { id: 101, title: '纯爱', pic: '/src/assets/images/library/theme/theme-1.png' },
          { id: 102, title: '衍生', pic: '/src/assets/images/library/theme/theme-1.png' },
          { id: 103, title: '综影视', pic: '/src/assets/images/library/theme/theme-1.png' },
          { id: 104, title: '赛博朋克', pic: '/src/assets/images/library/theme/theme-1.png' },
          { id: 105, title: '悬疑恋爱', pic: '/src/assets/images/library/theme/theme-1.png' },
          { id: 106, title: '悬疑', pic: '/src/assets/images/library/theme/theme-6.png' },
          { id: 107, title: '克苏鲁', pic: '/src/assets/images/library/theme/theme-7.png' },
          { id: 108, title: '都市异能', pic: '/src/assets/images/library/theme/theme-8.png' },
          { id: 109, title: '末日求生', pic: '/src/assets/images/library/theme/theme-9.png' },
          { id: 110, title: '灵气复苏', pic: '/src/assets/images/library/theme/theme-10.png' },
          { id: 111, title: '高武世界', pic: '/src/assets/images/library/theme/theme-11.png' },
          { id: 112, title: '异世大陆', pic: '/src/assets/images/library/theme/theme-12.png' },
          { id: 113, title: '东方玄幻', pic: '/src/assets/images/library/theme/theme-13.png' },
          { id: 114, title: '谍战', pic: '/src/assets/images/library/theme/theme-14.png' },
          { id: 115, title: '清朝', pic: '/src/assets/images/library/theme/theme-15.png' },
          { id: 116, title: '宋朝', pic: '/src/assets/images/library/theme/theme-16.png' },
          { id: 117, title: '断层', pic: '/src/assets/images/library/theme/theme-17.png' },
          { id: 118, title: '武将', pic: '/src/assets/images/library/theme/theme-18.png' },
          { id: 119, title: '国运', pic: '/src/assets/images/library/theme/theme-19.png' },
          { id: 120, title: '职场商战', pic: '/src/assets/images/library/theme/theme-20.png' },
          { id: 121, title: '日久生情', pic: '/src/assets/images/library/theme/theme-21.png' },
          { id: 122, title: '豪门世家', pic: '/src/assets/images/library/theme/theme-22.png' },
          { id: 123, title: '综漫', pic: '/src/assets/images/library/theme/theme-23.png' },
          { id: 124, title: '异世穿越', pic: '/src/assets/images/library/theme/theme-24.png' },
        ],
      },
      {
        id: 2,
        title: '角色',
        group: 'role_type',
        child: [
          { id: 201, title: '总裁', pic: '/src/assets/images/library/role/role-1.png' },
          { id: 202, title: '多女主', pic: '/src/assets/images/library/role/role-2.png' },
          { id: 203, title: '赘婿', pic: '/src/assets/images/library/role/role-3.png' },
          { id: 204, title: '奸情', pic: '/src/assets/images/library/role/role-4.png' },
          { id: 205, title: '大佬', pic: '/src/assets/images/library/role/role-5.png' },
          { id: 206, title: '大小姐', pic: '/src/assets/images/library/role/role-6.png' },
          { id: 207, title: '特工', pic: '/src/assets/images/library/role/role-7.png' },
          { id: 208, title: '游戏主播', pic: '/src/assets/images/library/role/role-8.png' },
          { id: 209, title: '神探', pic: '/src/assets/images/library/role/role-9.png' },
          { id: 210, title: '宫廷侯爵', pic: '/src/assets/images/library/role/role-10.png' },
          { id: 211, title: '皇帝', pic: '/src/assets/images/library/role/role-11.png' },
          { id: 212, title: '将军', pic: '/src/assets/images/library/role/role-12.png' },
          { id: 213, title: '毒医', pic: '/src/assets/images/library/role/role-13.png' },
          { id: 214, title: '厨娘', pic: '/src/assets/images/library/role/role-14.png' },
          { id: 215, title: '律师', pic: '/src/assets/images/library/role/role-15.png' },
          { id: 216, title: '医生', pic: '/src/assets/images/library/role/role-16.png' },
          { id: 217, title: '明星', pic: '/src/assets/images/library/role/role-17.png' },
          { id: 218, title: '替身', pic: '/src/assets/images/library/role/role-18.png' },
          { id: 219, title: '双面', pic: '/src/assets/images/library/role/role-19.png' },
          { id: 220, title: '冰山', pic: '/src/assets/images/library/role/role-20.png' },
          { id: 221, title: '古灵精怪', pic: '/src/assets/images/library/role/role-21.png' },
          { id: 222, title: '天作之合', pic: '/src/assets/images/library/role/role-22.png' },
          { id: 223, title: '可盐可甜', pic: '/src/assets/images/library/role/role-23.png' },
          { id: 224, title: '无CP', pic: '/src/assets/images/library/role/role-24.png' },
        ],
      },
      {
        id: 3,
        title: '情节',
        group: 'plot_type',
        child: [
          { id: 301, title: '女频悬疑', pic: '/src/assets/images/library/plot/plot-1.png' },
          { id: 302, title: '西方奇幻', pic: '/src/assets/images/library/plot/plot-2.png' },
          { id: 303, title: '东方仙侠', pic: '/src/assets/images/library/plot/plot-2.png' },
          { id: 304, title: '古风世情', pic: '/src/assets/images/library/plot/plot-2.png' },
          { id: 305, title: '科幻末世', pic: '/src/assets/images/library/plot/plot-5.png' },
          { id: 306, title: '男频衍生', pic: '/src/assets/images/library/plot/plot-2.png' },
          { id: 307, title: '女频衍生', pic: '/src/assets/images/library/plot/plot-2.png' },
          { id: 308, title: '民国言情', pic: '/src/assets/images/library/plot/plot-2.png' },
          { id: 309, title: '都市高武', pic: '/src/assets/images/library/plot/plot-2.png' },
          { id: 310, title: '悬疑灵异', pic: '/src/assets/images/library/plot/plot-10.png' },
          { id: 311, title: '悬疑脑洞', pic: '/src/assets/images/library/plot/plot-11.png' },
          { id: 312, title: '抗战谍战', pic: '/src/assets/images/library/plot/plot-12.png' },
          { id: 313, title: '青春甜宠', pic: '/src/assets/images/library/plot/plot-13.png' },
          { id: 314, title: '双男主', pic: '/src/assets/images/library/plot/plot-14.png' },
          { id: 315, title: '古言脑洞', pic: '/src/assets/images/library/plot/plot-15.png' },
          { id: 316, title: '历史古代', pic: '/src/assets/images/library/plot/plot-16.png' },
          { id: 317, title: '历史脑洞', pic: '/src/assets/images/library/plot/plot-17.png' },
          { id: 318, title: '现言脑洞', pic: '/src/assets/images/library/plot/plot-18.png' },
          { id: 319, title: '都市种田', pic: '/src/assets/images/library/plot/plot-19.png' },
          { id: 320, title: '都市脑洞', pic: '/src/assets/images/library/plot/plot-20.png' },
          { id: 321, title: '都市日常', pic: '/src/assets/images/library/plot/plot-15.png' },
          { id: 322, title: '玄幻脑洞', pic: '/src/assets/images/library/plot/plot-22.png' },
          { id: 323, title: '玄幻言情', pic: '/src/assets/images/library/plot/plot-23.png' },
          { id: 324, title: '宫斗', pic: '/src/assets/images/library/plot/plot-24.png' },
        ],
      },
    ],
    state: [
      { id: 0, title: '全部' },
      { id: 1, title: '连载中' },
      { id: 2, title: '已完结' },
    ],
    words: [
      { id: 0, title: '全部' },
      { id: 1, title: '30万以下' },
      { id: 2, title: '30-50万' },
      { id: 3, title: '50-100万' },
      { id: 4, title: '100-200万' },
      { id: 5, title: '200万以上' },
    ],
  }

  /* ======================
     state（唯一事实源）
  ====================== */

  const [readersId, setReadersId] = useState(0)
  const [readerType, setReaderType] = useState('')

  const [categoryGroup, setCategoryGroup] = useState('')
  const [categoryType, setCategoryType] = useState('')
  const [classifyChild, setClassifyChild] = useState<any[]>([])

  const [status, setStatus] = useState('')
  const [wordCountRange, setWordCountRange] = useState('')

  /* ======================
     初始化：默认选中第一个分类的第一个子项
  ====================== */

  useEffect(() => {
    const firstClassify = typelist.classify[0]
    const children = firstClassify.child || []

    setCategoryGroup(firstClassify.group || '')
    setClassifyChild(children)
    setCategoryType(children.length > 0 ? children[0].title : '')
  }, [])

  /* ======================
     统一 emit（唯一出口）
  ====================== */

  useEffect(() => {
    onUpdateFilters({
      reader_type: readerType,
      category_group: categoryGroup,
      category_type: categoryType,
      status,
      word_count_range: wordCountRange,
    })
  }, [readerType, categoryGroup, categoryType, status, wordCountRange])

  /* ======================
     事件：只改 state
  ====================== */

  const changeReaders = (item: any) => {
    setReadersId(item.id)
    setReaderType(item.title === '全部' ? '' : item.title)
  }

  const changeClassify = (item: any) => {
    const children = item.child || []

    setCategoryGroup(item.group || '')
    setClassifyChild(children)
    setCategoryType(children.length > 0 ? children[0].title : '')
  }

  const changeChild = (item: any) => {
    setCategoryType(item.title)
  }

  const changeStatus = (item: any) => {
    setStatus(item.title === '全部' ? '' : item.title)
  }

  const changeWords = (item: any) => {
    setWordCountRange(item.title === '全部' ? '' : item.title)
  }

  /* ======================
     render
  ====================== */

  return (
    <div className={styles['library-typelist']}>
      {/* 读者 */}
      <div className={styles.filter}>
        <div className={styles['filter-title']}>读者：</div>
        <div className={styles['filter-list']}>
          {typelist.readers.map(item => (
            <div
              key={item.id}
              className={`${styles['filter-item']} ${readersId === item.id ? styles.on : ''}`}
              onClick={() => changeReaders(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* 分类 */}
      <div className={styles.filter}>
        <div className={styles['filter-title']}>分类：</div>
        <div className={styles['filter-list']}>
          {typelist.classify.map(item => (
            <div
              key={item.id}
              className={`${styles['filter-item']} ${categoryGroup === item.group ? styles.on : ''}`}
              onClick={() => changeClassify(item)}
            >
              {item.title}
            </div>
          ))}
        </div>

        {classifyChild.length > 0 && (
          <div className={styles['child-list']}>
            {classifyChild.map(item => (
              <div
                key={item.id}
                className={`${styles['child-item']} ${categoryType === item.title ? styles.on : ''}`}
                onClick={() => changeChild(item)}
              >
                <img src={item.pic} className={styles['child-icon']} />
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 状态 */}
      <div className={styles.filter}>
        <div className={styles['filter-title']}>状态：</div>
        <div className={styles['filter-list']}>
          {typelist.state.map(item => (
            <div
              key={item.id}
              className={`${styles['filter-item']} ${
                status === item.title || (status === '' && item.title === '全部') ? styles.on : ''
              }`}
              onClick={() => changeStatus(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* 字数 */}
      <div className={styles.filter}>
        <div className={styles['filter-title']}>字数：</div>
        <div className={styles['filter-list']}>
          {typelist.words.map(item => (
            <div
              key={item.id}
              className={`${styles['filter-item']} ${
                wordCountRange === item.title || (wordCountRange === '' && item.title === '全部') ? styles.on : ''
              }`}
              onClick={() => changeWords(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TypeList
