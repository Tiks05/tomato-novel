namespace TomatoNovel.Application.DTOs.Home.Responses;

public class RecommendResponseDto
{
    public List<BookResponseDto> Male { get; set; } = new();
    public List<BookResponseDto> Female { get; set; } = new();
}
