namespace TomatoNovel.Application.DTOs.Common.Responses;

/// <summary>
/// 获取 Banner 列表 - 响应 DTO
/// </summary>
public class BannerListResponseDto
{
    /// <summary>
    /// Banner 列表
    /// </summary>
    public List<BannerItemDto> Items { get; set; } = new();
}
