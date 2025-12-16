namespace TomatoNovel.Application.DTOs.Library.Responses;

public class BookListResponseDto
{
    /// <summary>
    /// 总记录数
    /// </summary>
    public int Total { get; set; }

    /// <summary>
    /// 当前页书籍列表
    /// </summary>
    public List<BookItemDto> Records { get; set; } = new();
}
