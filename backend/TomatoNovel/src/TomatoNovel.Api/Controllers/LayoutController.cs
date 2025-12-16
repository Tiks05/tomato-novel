namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.Layout.Requests;
using TomatoNovel.Application.DTOs.Layout.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/layout")]
public class LayoutController : ControllerBase
{
    private readonly ILayoutService layoutService;

    public LayoutController(ILayoutService layoutService)
    {
        this.layoutService = layoutService;
    }

    /// <summary>
    /// 更新用户资料
    /// </summary>
    /// <summary>
    /// 更新用户资料
    /// </summary>
    [HttpPost("profile/update")]
    [Authorize]
    [ProducesResponseType(
        typeof(ApiResponse<UserProfileUpdateResponseDto>),
        StatusCodes.Status200OK)]
    public IActionResult UpdateProfile(
        [FromForm] long Id,
        [FromForm] string Name,
        [FromForm] string Introduction,
        IFormFile? Avatar
    )
    {
        try
        {
            // -----------------------------
            // 头像：有文件才处理
            // -----------------------------
            Stream? avatarStream = null;
            string? avatarFileName = null;

            if (Avatar != null && Avatar.Length > 0)
            {
                avatarStream = Avatar.OpenReadStream();
            }

            // -----------------------------
            // 调用业务层
            // -----------------------------
            var response = layoutService.UpdateUserProfile(
                Id,
                Name,
                Introduction,
                avatarStream
            );

            return Ok(
                ApiResponse<UserProfileUpdateResponseDto>.Success(response)
            );
        }
        catch (Exception ex)
        {
            return Ok(
                ApiResponse<object>.Fail(
                    40020,
                    ex.Message
                )
            );
        }
    }

    /// <summary>
    /// 搜索书籍
    /// </summary>
    [HttpGet("search-books")]
    [AllowAnonymous]
    [ProducesResponseType(
        typeof(ApiResponse<SearchBookResponseDto>),
        StatusCodes.Status200OK)]
    public IActionResult SearchBooks([FromQuery] SearchBookRequestDto request)
    {
        try
        {
            var response = this.layoutService.SearchBooks(request);
            return this.Ok(
                ApiResponse<SearchBookResponseDto>.Success(response)
            );
        }
        catch (Exception ex)
        {
            return this.Ok(
                ApiResponse<object>.Fail(
                    40021,
                    ex.Message
                )
            );
        }
    }
}
