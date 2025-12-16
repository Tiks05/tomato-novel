namespace TomatoNovel.Application.DTOs.Layout.Responses;

public class UserProfileUpdateResponseDto
{
    /// <summary>
    /// Gets or sets 头像（绝对路径）.
    /// </summary>
    public string Avatar { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 昵称.
    /// </summary>
    public string Nickname { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 个性签名.
    /// </summary>
    public string Signature { get; set; } = string.Empty;
}
