namespace TomatoNovel.Application.DTOs.Auth.Requests;

/// <summary>
/// Represents the request model for login or register operation.
/// </summary>
public class LoginOrRegisterRequestDto
{
    public string Phone { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}
