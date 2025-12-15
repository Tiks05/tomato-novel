// src/types/home/requests/ranking-request.types.ts

/**
 * 榜单请求参数
 */
export interface RankingRequest {
  /**
   * 读者类型
   */
  readerType: string

  /**
   * 作品分类
   * 示例：'东方玄幻' | '西方奇幻'
   */
  plot_type: string
}
