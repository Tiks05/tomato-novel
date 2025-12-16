namespace TomatoNovel.Application.DTOs.BookInfo.Responses;

public class BookHeaderResponseDto
{
    public BookHeaderBookDto Book { get; set; } = null!;

    public BookHeaderAuthorDto Author { get; set; } = null!;
}
