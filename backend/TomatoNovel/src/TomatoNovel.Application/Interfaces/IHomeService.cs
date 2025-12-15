using TomatoNovel.Application.DTOs.Home.Requests;
using TomatoNovel.Application.DTOs.Home.Responses;

namespace TomatoNovel.Application.Interfaces;

public interface IHomeService
{
    List<TopBookResponseDto> GetTopBooks();

    List<NewsResponseDto> GetNewsList(NewsListRequestDto request);

    List<WriterResponseDto> GetWriterList();

    RecommendResponseDto GetRecommend();

    BookRankingResponseDto GetRanking(RankingRequestDto request);

    List<RecentUpdateResponseDto> GetRecentUpdates();
}
