namespace TomatoNovel.Application.Interfaces;

/// <summary>
/// Provides methods for generating OpenIddict access tokens.
/// </summary>
public interface IOpenIddictTokenService
{
    /// <summary>
    /// Generates an access token using the specified username and password.
    /// </summary>
    /// <param name="username">The username used for authentication.</param>
    /// <param name="password">The password used for authentication.</param>
    /// <returns>The generated access token.</returns>
    Task<string> GenerateTokenAsync(string username, string password);
}
