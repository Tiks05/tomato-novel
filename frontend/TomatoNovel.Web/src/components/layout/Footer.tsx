import styles from './Footer.module.scss'

import logo from '@/assets/icons/logo/icons8-firebase-undefined-32.png'

const Footer = () => {
  return (
    <div className={styles['zone-footer']}>
      <div className={styles['zone-footer-ctn']}>
        <div className={styles['zone-footer-ctn-left']}>
          <div className={styles['zone-footer-ctn-left-left']}>
            <div className={styles['logo-box']}>
              <img src={logo} alt="logo" className={styles['logo-img']} />
              <span className={styles['logo-text']}>番茄小说网</span>
            </div>

            <a href="/protocal/agreement" target="_blank">
              《番茄小说网用户协议》
            </a>
            <a href="/protocal/privacy" target="_blank" style={{ marginTop: 4 }}>
              《番茄小说网隐私政策》
            </a>

            <p style={{ marginTop: 58 }}>© 2025 本系统仅供学习与教学使用</p>
          </div>

          <div className={styles['zone-footer-ctn-left-right']}>
            <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index" rel="noopener noreferrer nofollow">
              京ICP备18018851号-8
            </a>

            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802030409"
              rel="noopener noreferrer nofollow"
              style={{ marginTop: 2 }}
            >
              <span className={styles.police}></span>
              京公网安备 11010802030409号
            </a>

            <a
              target="_blank"
              href="https://fanqienovel.com/writer/zone/licence/icp"
              rel="noopener noreferrer nofollow"
              style={{ marginTop: 2 }}
            >
              京ICP证 京B2-20200085号
            </a>

            <div className={styles['zone-footer-ctn-left-licence']} style={{ marginTop: 2 }}>
              <a
                target="_blank"
                href="https://fanqienovel.com/writer/zone/licence/business"
                rel="noopener noreferrer nofollow"
              >
                营业执照
              </a>
              <a
                target="_blank"
                href="https://fanqienovel.com/writer/zone/licence/publication"
                rel="noopener noreferrer nofollow"
              >
                出版物经营许可证
              </a>
              <a
                target="_blank"
                href="https://fanqienovel.com/writer/zone/licence/radioTv"
                rel="noopener noreferrer nofollow"
              >
                广播电视节目制作经营许可证
              </a>
            </div>

            <div className={styles['zone-footer-ctn-left-right-msg']}>
              <p>
                广告投放：
                <a
                  href="https://www.oceanengine.com/resource/fanqie?source=fanqiepc"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  www.oceanengine.com
                </a>
              </p>

              <p>
                不良信息举报：
                <span className={styles['zone-footer-ctn-left-right-msg-report']}>fanqiejubao@bytedance.com</span>
              </p>

              <p>意见建议邮箱：original_articles@bytedance.com</p>
              <p>版权咨询：2947820142@qq.com</p>

              <a href="/friend_links" target="_blank" rel="noopener noreferrer">
                友情链接
              </a>
            </div>
          </div>
        </div>

        <div className={styles['zone-footer-ctn-right']}>
          <div className={styles['zone-footer-ctn-right-wechat']}>
            <img src="https://p6-novel.byteimg.com/origin/novel-static/cc64631d97326693e96de67c759a608d" />
            <div className={styles['zone-footer-ctn-right-wechat-desc']}>打开微信扫码关注微信公众号</div>
          </div>

          <div className={styles['zone-footer-ctn-right-tiktok']}>
            <img src="https://p3-novel.byteimg.com/origin/novel-static/9d78ec9edddfacb4fb2013dc36db9818" />
            <div className={styles['zone-footer-ctn-right-tiktok-desc']}>打开抖音扫码关注官方帐号</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
