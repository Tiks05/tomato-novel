namespace TomatoNovel.Application.DTOs.Home.Responses;

public class BookResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public string CoverUrl { get; set; } = string.Empty;
    public string AuthorNickname { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
}
