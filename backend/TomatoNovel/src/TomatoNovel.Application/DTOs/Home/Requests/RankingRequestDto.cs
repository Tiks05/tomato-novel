namespace TomatoNovel.Application.DTOs.Home.Requests;

public class RankingRequestDto
{
    /// <summary>
    /// 读者类型（男生 / 女生）
    /// </summary>
    public string ReaderType { get; set; } = string.Empty;

    /// <summary>
    /// 作品分类（如 东方玄幻 / 西方奇幻）
    /// </summary>
    public string PlotType { get; set; } = string.Empty;
}
