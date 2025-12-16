namespace TomatoNovel.Application.DTOs.Home.Responses;

public class BookRankingResponseDto
{
    public string PlotType { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 热门榜.
    /// </summary>
    public List<RankingBookResponseDto> Child { get; set; } = new();

    /// <summary>
    /// Gets or sets 新书榜.
    /// </summary>
    public List<RankingBookResponseDto> NewChild { get; set; } = new();
}
