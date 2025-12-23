namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class BookRankResponseDto
{
    public string PlotType { get; set; } = string.Empty;
    public List<BookRankItemDto> Child { get; set; } = [];
}
