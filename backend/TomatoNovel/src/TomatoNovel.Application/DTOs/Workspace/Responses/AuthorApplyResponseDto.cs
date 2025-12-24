namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class AuthorApplyResponseDto
{
    public string Avatar { get; set; } = string.Empty;

    public string Nickname { get; set; } = string.Empty;

    public string? BecomeAuthorAt { get; set; }

    public string Signature { get; set; } = string.Empty;
}
