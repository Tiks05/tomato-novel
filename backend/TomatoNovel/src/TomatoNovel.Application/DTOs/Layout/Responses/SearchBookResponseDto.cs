namespace TomatoNovel.Application.DTOs.Layout.Responses;

public class SearchBookResponseDto
{
    /// <summary>
    /// 总条数
    /// </summary>
    public int Total { get; set; }

    /// <summary>
    /// 书籍列表
    /// </summary>
    public List<SearchBookItemDto> Records { get; set; } = new();
}
