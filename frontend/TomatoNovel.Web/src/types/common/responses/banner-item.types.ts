/**
 * Banner 列表中的单个 Banner 项
 */
export interface BannerItem {
  /**
   * Banner 图片完整 URL
   */
  banner_url: string

  /**
   * 点击后跳转路径
   * 示例：/classroom/123
   */
  path: string
}
