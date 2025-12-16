namespace TomatoNovel.Application.DTOs.Library.Responses;

public class BookListResponseDto
{
    /// <summary>
    /// Gets or sets 总记录数.
    /// </summary>
    public int Total { get; set; }

    /// <summary>
    /// Gets or sets 当前页书籍列表.
    /// </summary>
    public List<BookItemDto> Records { get; set; } = new();
}
