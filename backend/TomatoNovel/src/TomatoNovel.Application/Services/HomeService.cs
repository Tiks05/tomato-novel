namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.Home.Requests;
using TomatoNovel.Application.DTOs.Home.Responses;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Interfaces;

public class HomeService : IHomeService
{
    private readonly IHomeRepository homeRepository;

    public HomeService(IHomeRepository homeRepository)
    {
        this.homeRepository = homeRepository;
    }

    public List<TopBookResponseDto> GetTopBooks()
    {
        var data = this.homeRepository.GetTopBooks();

        return data.Select((b, index) => new TopBookResponseDto
        {
            Num = (index + 1).ToString("D2"),
            Title = b.Title,
            Desc = string.IsNullOrEmpty(b.Tags) ? "未知分类" : b.Tags.Split(',')[0],
            Pic = b.CoverUrl ?? string.Empty,
            Path = $"/bookinfo/{b.Id}",
        }).ToList();
    }

    public List<NewsResponseDto> GetNewsList(NewsListRequestDto request)
    {
        var data = this.homeRepository.GetNewsList(request.Limit);

        return data.Select(n => new NewsResponseDto
        {
            Title = n.Title,
            Path = $"/newsinfo/{n.Id}",
        }).ToList();
    }

    public List<WriterResponseDto> GetWriterList()
    {
        var data = this.homeRepository.GetWriterList();

        return data.Select(w => new WriterResponseDto
        {
            Title = w.Nickname,
            Desc = w.Masterpiece ?? string.Empty,
            Type = w.AuthorLevel,
            Pic = w.LifePhoto ?? string.Empty,
            Path = $"/writerinfo/{w.Id}",
        }).ToList();
    }

    public RecommendResponseDto GetRecommend()
    {
        var (male, female) = this.homeRepository.GetRecommendBooks();

        return new RecommendResponseDto
        {
            Male = male.Select(b => new BookResponseDto
            {
                Id = b.Id,
                Title = b.Title,
                Desc = b.Intro,
                CoverUrl = b.CoverUrl ?? string.Empty,
                AuthorNickname = b.AuthorNickname,
                Path = $"/bookinfo/{b.Id}",
            }).ToList(),

            Female = female.Select(b => new BookResponseDto
            {
                Id = b.Id,
                Title = b.Title,
                Desc = b.Intro,
                CoverUrl = b.CoverUrl ?? string.Empty,
                AuthorNickname = b.AuthorNickname,
                Path = $"/bookinfo/{b.Id}"
            }).ToList(),
        };
    }

    public BookRankingResponseDto GetRanking(RankingRequestDto request)
    {
        var (hot, newest) = this.homeRepository.GetRanking(
            request.ReaderType,
            request.PlotType);

        return new BookRankingResponseDto
        {
            PlotType = request.PlotType,

            // 热门榜
            Child = hot.Select((b, index) => new RankingBookResponseDto
            {
                Num = (index + 1).ToString("D2"),   // 01 / 02 / 03
                Title = b.Title,
                Desc = b.Intro,
                Path = $"/bookinfo/{b.Id}",
                Pic = b.CoverUrl ?? string.Empty,
                Author = b.AuthorNickname,
            }).ToList(),

            // 新书榜
            NewChild = newest.Select((b, index) => new RankingBookResponseDto
            {
                Num = (index + 1).ToString("D2"),
                Title = b.Title,
                Desc = b.Intro,
                Path = $"/bookinfo/{b.Id}",
                Pic = b.CoverUrl ?? string.Empty,
                Author = b.AuthorNickname
            }).ToList(),
        };
    }

    public List<RecentUpdateResponseDto> GetRecentUpdates()
    {
        var data = this.homeRepository.GetRecentUpdates(10);

        return data.Select(d => new RecentUpdateResponseDto
        {
            Type = d.PlotType,
            Title = d.BookTitle,
            Path = $"/bookinfo/{d.BookId}",
            Chapter = d.ChapterTitle,
            Author = d.AuthorNickname,
            Time = d.UpdatedAt.ToString("yyyy-MM-dd HH:mm"),
        }).ToList();
    }
}
