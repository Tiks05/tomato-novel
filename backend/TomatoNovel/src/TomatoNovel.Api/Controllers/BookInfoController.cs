namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.BookInfo.Requests;
using TomatoNovel.Application.DTOs.BookInfo.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/book-info")]
public class BookInfoController : ControllerBase
{
    private readonly IBookInfoService bookInfoService;

    public BookInfoController(IBookInfoService bookInfoService)
    {
        this.bookInfoService = bookInfoService;
    }

    [HttpGet("header/{bookId}")]
    [AllowAnonymous]
    public IActionResult GetBookHeader([FromRoute] int bookId)
    {
        var result = this.bookInfoService.GetBookHeader(bookId);
        return this.Ok(ApiResponse<BookHeaderResponseDto>.Success(result));
    }

    [HttpGet("content/{bookId}")]
    [AllowAnonymous]
    public IActionResult GetBookContent([FromRoute] int bookId)
    {
        var result = this.bookInfoService.GetBookContent(bookId);
        return this.Ok(ApiResponse<BookContentResponseDto>.Success(result));
    }

    [HttpGet("chapter")]
    [AllowAnonymous]
    public IActionResult ReadChapter([FromQuery] ChapterReadRequestDto request)
    {
        var result = this.bookInfoService.ReadChapter(request);
        return this.Ok(ApiResponse<ChapterReadResponseDto>.Success(result));
    }
}
