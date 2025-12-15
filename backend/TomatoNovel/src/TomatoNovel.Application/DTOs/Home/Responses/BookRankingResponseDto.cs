namespace TomatoNovel.Application.DTOs.Home.Responses;

public class BookRankingResponseDto
{
    public string PlotType { get; set; } = string.Empty;

    /// <summary>
    /// 热门榜
    /// </summary>
    public List<RankingBookResponseDto> Child { get; set; } = new();

    /// <summary>
    /// 新书榜
    /// </summary>
    public List<RankingBookResponseDto> NewChild { get; set; } = new();
}
