namespace TomatoNovel.Application.DTOs.Common.Requests;

/// <summary>
/// 获取 Banner 列表 - 请求参数 DTO
/// </summary>
public class BannerListRequestDto
{
    /// <summary>
    /// 返回数量限制
    /// </summary>
    public int Limit { get; set; }
}
