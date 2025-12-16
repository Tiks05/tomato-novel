namespace TomatoNovel.Application.DTOs.Layout.Responses;

public class SearchBookResponseDto
{
    /// <summary>
    /// Gets or sets 总条数.
    /// </summary>
    public int Total { get; set; }

    /// <summary>
    /// Gets or sets 书籍列表.
    /// </summary>
    public List<SearchBookItemDto> Records { get; set; } = new();
}
