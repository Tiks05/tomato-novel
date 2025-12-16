namespace TomatoNovel.Application.DTOs.BookInfo.Responses;

public class BookVolumeDto
{
    public string Title { get; set; } = string.Empty;

    public int ChapterCount { get; set; }

    public List<BookChapterDto> Chapters { get; set; } = new();
}
