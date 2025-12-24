namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class BookDetailResponseDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string CoverUrl { get; set; } = string.Empty;

    public string TargetReaders { get; set; } = string.Empty;

    public string Tags { get; set; } = string.Empty;

    public string MainRoles { get; set; } = string.Empty;

    public string Intro { get; set; } = string.Empty;

    public string CreatedAt { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string ContractStatus { get; set; } = string.Empty;

    public string UpdateStatus { get; set; } = string.Empty;
}
