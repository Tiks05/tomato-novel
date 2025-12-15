namespace TomatoNovel.Application.DTOs.Auth.Responses;

using System.Text.Json.Serialization;

/// <summary>
/// Represents the token response returned by the OpenIddict token endpoint.
/// </summary>
public class TokenResponseDto
{
    /// <summary>
    /// Gets or sets the issued access token.
    /// </summary>
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the issued refresh token, if applicable.
    /// </summary>
    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the type of the issued token (typically "Bearer").
    /// </summary>
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the lifetime of the access token in seconds.
    /// </summary>
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
}
