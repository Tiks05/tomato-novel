namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.Writer.Requests;
using TomatoNovel.Application.DTOs.Writer.Responses;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Interfaces;

public class WriterService : IWriterService
{
    private readonly IWriterRepository writerRepository;

    public WriterService(IWriterRepository writerRepository)
    {
        this.writerRepository = writerRepository;
    }

    public List<object> GetNewsList(WriterNewsQueryRequestDto request)
    {
        var type = request.Type == "notice" ? "notice" : "active";
        var limit = request.Limit ?? 5;

        var list = this.writerRepository.GetNewsByType(type, limit);

        if (type == "notice")
        {
            return list.Select(n => new WriterNoticeResponseDto
            {
                Title = n.Title,
                Path = $"/newsinfo/{n.Id}",
            }).Cast<object>().ToList();
        }

        return list.Select(n => new WriterActiveResponseDto
        {
            CoverUrl = n.CoverUrl,
            Title = n.Title,
            Path = $"/newsinfo/{n.Id}",
            UpdatedAt = n.UpdatedAt.ToString("yyyy-MM-dd"),
        }).Cast<object>().ToList();
    }

    public List<WriterClassroomResponseDto> GetClassroomList(
        WriterClassroomQueryRequestDto request)
    {
        var list = this.writerRepository
            .GetClassroomsByCategory(request.CategoryType);

        return list.Select(c => new WriterClassroomResponseDto
        {
            Title = c.Title,
            Intro = c.Intro ?? string.Empty,
            CoverUrl = c.CoverUrl ?? string.Empty,
            Path = $"/classroom/{c.Id}",
            IsIncludeVideo = c.IsIncludeVideo,
        }).ToList();
    }
}
