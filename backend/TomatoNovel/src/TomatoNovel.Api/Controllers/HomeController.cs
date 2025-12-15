using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Application.DTOs.Home.Requests;
using TomatoNovel.Application.DTOs.Home.Responses;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Api.Responses;

namespace TomatoNovel.Api.Controllers;

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
        var result = homeService.GetTopBooks();
        return Ok(ApiResponse<List<TopBookResponseDto>>.Success(result));
    }

    [HttpGet("news-list")]
    [AllowAnonymous]
    public IActionResult GetNewsList([FromQuery] NewsListRequestDto request)
    {
        var result = homeService.GetNewsList(request);
        return Ok(ApiResponse<List<NewsResponseDto>>.Success(result));
    }

    [HttpGet("writer-list")]
    [AllowAnonymous]
    public IActionResult GetWriterList()
    {
        var result = homeService.GetWriterList();
        return Ok(ApiResponse<List<WriterResponseDto>>.Success(result));
    }

    [HttpGet("recommend")]
    [AllowAnonymous]
    public IActionResult Recommend()
    {
        var result = homeService.GetRecommend();
        return Ok(ApiResponse<RecommendResponseDto>.Success(result));
    }

    [HttpGet("ranking")]
    [AllowAnonymous]
    public IActionResult GetRanking([FromQuery] RankingRequestDto request)
    {
        var result = homeService.GetRanking(request);
        return Ok(ApiResponse<BookRankingResponseDto>.Success(result));
    }

    [HttpGet("recent-updates")]
    [AllowAnonymous]
    public IActionResult GetRecentUpdates()
    {
        var result = homeService.GetRecentUpdates();
        return Ok(ApiResponse<List<RecentUpdateResponseDto>>.Success(result));
    }
}
