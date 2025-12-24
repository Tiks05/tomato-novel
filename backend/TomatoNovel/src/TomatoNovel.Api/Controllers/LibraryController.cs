namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.Library.Requests;
using TomatoNovel.Application.DTOs.Library.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/library")]
[AllowAnonymous]
public class LibraryController : ControllerBase
{
    private readonly ILibraryService libraryService;

    public LibraryController(ILibraryService libraryService)
    {
        this.libraryService = libraryService;
    }

    /// <summary>
    /// 获取书库列表.
    /// </summary>
    /// <returns></returns>
    [HttpGet("books")]
    [ProducesResponseType(
        typeof(ApiResponse<BookListResponseDto>),
        StatusCodes.Status200OK)]
    public IActionResult GetBooks([FromQuery] BookListQueryRequestDto request)
    {
        try
        {
            var result = this.libraryService.GetBooks(request);
            return this.Ok(ApiResponse<BookListResponseDto>.Success(result));
        }
        catch (Exception ex)
        {
            return this.Ok(ApiResponse<object>.Fail(40020, ex.Message));
        }
    }
}
