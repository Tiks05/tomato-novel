namespace TomatoNovel.Application.DTOs.Common.Responses;

/// <summary>
/// Banner 列表中的单个 Banner DTO.
/// </summary>
public class BannerItemDto
{
    /// <summary>
    /// Gets or sets banner 图片完整 URL.
    /// </summary>
    public string BannerUrl { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 点击后跳转路径
    /// 示例：/classroom/123.
    /// </summary>
    public string Path { get; set; } = string.Empty;
}
