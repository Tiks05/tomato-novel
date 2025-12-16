namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.Home.Requests;
using TomatoNovel.Application.DTOs.Home.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/home")]
public class HomeController : ControllerBase
{
    private readonly IHomeService homeService;

    public HomeController(IHomeService homeService)
    {
        this.homeService = homeService;
    }

    [HttpGet("top-books")]
    [AllowAnonymous]
    public IActionResult GetTopBooks()
    {
        var result = this.homeService.GetTopBooks();
        return this.Ok(ApiResponse<List<TopBookResponseDto>>.Success(result));
    }

    [HttpGet("news-list")]
    [AllowAnonymous]
    public IActionResult GetNewsList([FromQuery] NewsListRequestDto request)
    {
        var result = this.homeService.GetNewsList(request);
        return this.Ok(ApiResponse<List<NewsResponseDto>>.Success(result));
    }

    [HttpGet("writer-list")]
    [AllowAnonymous]
    public IActionResult GetWriterList()
    {
        var result = this.homeService.GetWriterList();
        return this.Ok(ApiResponse<List<WriterResponseDto>>.Success(result));
    }

    [HttpGet("recommend")]
    [AllowAnonymous]
    public IActionResult Recommend()
    {
        var result = this.homeService.GetRecommend();
        return this.Ok(ApiResponse<RecommendResponseDto>.Success(result));
    }

    [HttpGet("ranking")]
    [AllowAnonymous]
    public IActionResult GetRanking([FromQuery] RankingRequestDto request)
    {
        var result = this.homeService.GetRanking(request);
        return this.Ok(ApiResponse<BookRankingResponseDto>.Success(result));
    }

    [HttpGet("recent-updates")]
    [AllowAnonymous]
    public IActionResult GetRecentUpdates()
    {
        var result = this.homeService.GetRecentUpdates();
        return this.Ok(ApiResponse<List<RecentUpdateResponseDto>>.Success(result));
    }
}
