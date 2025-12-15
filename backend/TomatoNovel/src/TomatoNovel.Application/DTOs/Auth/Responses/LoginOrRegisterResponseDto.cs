namespace TomatoNovel.Application.DTOs.Auth.Responses;

/// <summary>
/// Result of login or automatic registration, including access token.
/// </summary>
public class LoginOrRegisterResponseDto
{
    /// <summary>
    /// Gets or sets logged-in user information.
    /// </summary>
    public UserInfoDto User { get; set; } = default!;

    /// <summary>
    /// Gets or sets openIddict access token.
    /// </summary>
    public string AccessToken { get; set; } = string.Empty;
}
