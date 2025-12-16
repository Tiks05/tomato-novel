namespace TomatoNovel.Application.DTOs.BookInfo.Requests;

public class ChapterReadRequestDto
{
    public int BookId { get; set; }
    public int VolumeId { get; set; }
    public int ChapterId { get; set; }
}
