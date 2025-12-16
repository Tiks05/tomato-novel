namespace TomatoNovel.Application.DTOs.Home.Requests;

public class NewsListRequestDto
{
    /// <summary>
    /// Gets or sets 返回新闻条数（默认 8）.
    /// </summary>
    public int Limit { get; set; } = 8;
}
