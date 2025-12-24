namespace TomatoNovel.Application.DTOs.Auth.Responses;

/// <summary>
/// Result of login or automatic registration, including access token and user info.
/// </summary>
public class LoginOrRegisterResponseDto
{
    /// <summary>
    /// Gets or sets the user identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the user's phone number.
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user's role.
    /// </summary>
    public string Role { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user's nickname.
    /// </summary>
    public string Nickname { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the URL of the user's avatar.
    /// </summary>
    public string Avatar { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the date when the user became an author, or an empty string.
    /// </summary>
    public string BecomeAuthorAt { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user's personal signature.
    /// </summary>
    public string Signature { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user's level.
    /// </summary>
    public int Level { get; set; }
}
