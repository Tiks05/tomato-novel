namespace TomatoNovel.Application.DTOs.Auth.Responses;

/// <summary>
/// Result of login or automatic registration, including access token.
/// </summary>
public class LoginOrRegisterResponseDto
{
    /// <summary>
    /// Logged-in user information.
    /// </summary>
    public UserInfoDto User { get; set; } = default!;

    /// <summary>
    /// OpenIddict access token.
    /// </summary>
    public string AccessToken { get; set; } = string.Empty;
}
