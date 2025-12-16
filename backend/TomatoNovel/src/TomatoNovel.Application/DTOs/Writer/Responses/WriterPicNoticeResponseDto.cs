namespace TomatoNovel.Application.DTOs.Writer.Responses;

public class WriterPicNoticeResponseDto
{
    public string? CoverUrl { get; set; }

    public string Title { get; set; } = default!;

    public string Path { get; set; } = default!;
}
