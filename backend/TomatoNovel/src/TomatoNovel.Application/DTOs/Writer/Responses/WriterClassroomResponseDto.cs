namespace TomatoNovel.Application.DTOs.Writer.Responses;

public class WriterClassroomResponseDto
{
    public string Title { get; set; } = default!;

    public string Intro { get; set; } = default!;

    public string CoverUrl { get; set; } = default!;

    public string Path { get; set; } = default!;

    public bool IsIncludeVideo { get; set; }
}
