namespace TomatoNovel.Application.DTOs.BookInfo.Responses;

public class BookContentResponseDto
{
    public string Intro { get; set; } = string.Empty;

    public List<BookVolumeDto> Volumes { get; set; } = new();
}
