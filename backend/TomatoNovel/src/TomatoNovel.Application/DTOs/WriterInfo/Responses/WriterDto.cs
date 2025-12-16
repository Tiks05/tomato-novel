namespace TomatoNovel.Application.DTOs.WriterInfo.Responses;

public class WriterDto
{
    public string Nickname { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;

    public string Signature { get; set; } = string.Empty;

    public string Intro { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 成为作者时间（ISO 字符串）.
    /// </summary>
    public string BecomeAuthorAt { get; set; } = string.Empty;

    public int TotalWords { get; set; }

    public int FollowerCount { get; set; }
}
