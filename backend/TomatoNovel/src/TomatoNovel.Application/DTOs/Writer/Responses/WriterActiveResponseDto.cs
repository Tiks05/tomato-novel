namespace TomatoNovel.Application.DTOs.Writer.Responses;

public class WriterActiveResponseDto
{
    public string? CoverUrl { get; set; }

    public string Title { get; set; } = default!;

    public string Path { get; set; } = default!;

    public string UpdatedAt { get; set; } = default!;
}
