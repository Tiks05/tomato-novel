namespace TomatoNovel.WebAPI.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.Workspace.Requests;
using TomatoNovel.Application.DTOs.Workspace.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/workspace")]
[Authorize]
public class WorkspaceController : ControllerBase
{
    private readonly IWorkspaceService workspaceService;

    public WorkspaceController(IWorkspaceService workspaceService)
    {
        this.workspaceService = workspaceService;
    }

    // 1. 申请作家
    [HttpPost("apply")]
    [Authorize]
    [Consumes("multipart/form-data")]
    [ProducesResponseType(
        typeof(ApiResponse<AuthorApplyResponseDto>),
        StatusCodes.Status200OK)]
    public IActionResult ApplyAuthor(
        [FromForm] long id,
        [FromForm] string name,
        [FromForm] string introduction,
        IFormFile? avatar)
    {
        try
        {
            // -----------------------------
            // 头像：有文件才处理
            // -----------------------------
            Stream? avatarStream = null;

            if (avatar != null && avatar.Length > 0)
            {
                avatarStream = avatar.OpenReadStream();
            }

            // -----------------------------
            // 调用业务层
            // -----------------------------
            var response = this.workspaceService.ApplyAuthor(
                id,
                name,
                introduction,
                avatarStream
            );

            return this.Ok(
                ApiResponse<AuthorApplyResponseDto>.Success(response));
        }
        catch (Exception ex)
        {
            return this.Ok(
                ApiResponse<object>.Fail(
                    40010,
                    ex.Message));
        }
    }



    // 2. 作家统计
    [HttpGet("writer/stats/{userId:int}")]
    [AllowAnonymous]
    public IActionResult GetWriterStats([FromRoute] int userId)
    {
        var result = workspaceService.GetWriterStats(userId);
        return Ok(ApiResponse<WriterStatsResponseDto>.Success(result));
    }

    // 3. 公告列表
    [HttpGet("writer/notice-list")]
    [AllowAnonymous]
    public IActionResult GetNoticeList([FromQuery] int limit = 3)
    {
        var result = workspaceService.GetNoticeList(limit);
        return Ok(ApiResponse<NoticeListResponseDto>.Success(result));
    }

    // 4. 活动列表
    [HttpGet("writer/news-list")]
    [AllowAnonymous]
    public IActionResult GetNewsList([FromQuery] int limit = 4)
    {
        var result = workspaceService.GetNewsList(limit);
        return Ok(ApiResponse<NewsListResponseDto>.Success(result));
    }

    // 5. 榜单
    [HttpGet("writer/book-rank")]
    [AllowAnonymous]
    public IActionResult GetBookRank([FromQuery] string type, [FromQuery] string category)
    {
        var result = workspaceService.GetBookRank(type, category);
        return Ok(ApiResponse<BookRankResponseDto>.Success(result));
    }

    // 6. 创建书籍
    [HttpPost("writer/create-book")]
    [Authorize]
    public IActionResult CreateBook(
        [FromForm] long id,
        [FromForm] string name,
        [FromForm] int reader_type,
        [FromForm] string tag,
        [FromForm] string hero1,
        [FromForm] string hero2,
        [FromForm] string introduction,
        IFormFile? cover)
    {
        try
        {
            Stream? coverStream = null;

            if (cover != null && cover.Length > 0)
            {
                coverStream = cover.OpenReadStream();
            }

            workspaceService.CreateBook(
                id,
                name,
                reader_type,
                tag,
                hero1,
                hero2,
                introduction,
                coverStream
            );

            return Ok(ApiResponse<object>.Success(null));
        }
        catch (Exception ex)
        {
            var msg = ex.InnerException?.Message ?? ex.Message;
            return Ok(ApiResponse<object>.Fail(500, msg));
        }
    }

    // 7. 我的书籍
    [HttpGet("writer/my-book-list")]
    public IActionResult GetMyBookList([FromQuery] MyBookListRequestDto request)
    {
        var result = workspaceService.GetMyBookList(request);
        return Ok(ApiResponse<MyBookListResponseDto>.Success(result));
    }

    // 8. 书籍详情
    [HttpGet("writer/book-overview/{bookId:int}")]
    public IActionResult GetBookOverview([FromRoute] int bookId)
    {
        var result = workspaceService.GetBookDetail(bookId);
        return Ok(ApiResponse<BookDetailResponseDto>.Success(result));
    }

    // 9. 删除书籍
    [HttpDelete("writer/delete-book/{bookId:int}")]
    public IActionResult DeleteBook([FromRoute] int bookId)
    {
        workspaceService.DeleteBook(bookId);
        return Ok(ApiResponse<object>.Success(null));
    }

    // 10. 更新书籍
    [HttpPost("writer/update-book")]
    public IActionResult UpdateBook(
        [FromForm] long book_id,
        [FromForm] string name,
        [FromForm] int reader_type,
        [FromForm] string tag,
        [FromForm] string hero1,
        [FromForm] string hero2,
        [FromForm] string introduction,
        IFormFile? cover)
    {
        try
        {
            Stream? coverStream = null;

            if (cover != null && cover.Length > 0)
            {
                coverStream = cover.OpenReadStream();
            }

            workspaceService.UpdateBook(
                book_id,
                name,
                reader_type,
                tag,
                hero1,
                hero2,
                introduction,
                coverStream
            );

            return Ok(ApiResponse<object>.Success(null));
        }
        catch (Exception ex)
        {
            var msg = ex.InnerException?.Message ?? ex.Message;
            return Ok(ApiResponse<object>.Fail(500, msg));
        }
    }


    // 11. 最近章节信息
    [HttpGet("writer/get-last-chapterInfo")]
    public IActionResult GetLastChapterInfo([FromQuery] int bookId)
    {
        var result = workspaceService.GetLastChapterInfo(bookId);
        return Ok(ApiResponse<LastChapterInfoResponseDto>.Success(result));
    }

    // 12. 创建章节
    [HttpPost("writer/create-chapter")]
    public IActionResult CreateChapter([FromBody] ChapterCreateRequestDto request)
    {
        workspaceService.CreateChapter(request);
        return Ok(ApiResponse<object>.Success(null));
    }

    // 13. 章节列表
    [HttpGet("writer/chapter-list")]
    public IActionResult GetChapterList([FromQuery] ChapterListRequestDto request)
    {
        var result = workspaceService.GetChapterList(request);
        return Ok(ApiResponse<ChapterListResponseDto>.Success(result));
    }

    // 14. 删除章节
    [HttpDelete("writer/delete-chapter/{chapterId:int}")]
    public IActionResult DeleteChapter([FromRoute] int chapterId)
    {
        workspaceService.DeleteChapter(chapterId);
        return Ok(ApiResponse<object>.Success(null));
    }

    // 15. 更新章节
    [HttpPost("writer/update-chapter")]
    public IActionResult UpdateChapter([FromBody] ChapterUpdateRequestDto request)
    {
        workspaceService.UpdateChapter(request);
        return Ok(ApiResponse<object>.Success(null));
    }

    // 16. 章节详情
    [HttpGet("writer/chapter-detail")]
    public IActionResult GetChapterDetail([FromQuery] ChapterDetailRequestDto dto)
    {
        var result = workspaceService.GetChapterDetail(dto.BookId, dto.ChapterId);
        return Ok(ApiResponse<ChapterDetailResponseDto>.Success(result));
    }


    // 17. 删除分卷
    [HttpDelete("writer/delete-volume")]
    public IActionResult DeleteVolume([FromQuery] int bookId, [FromQuery] int volumeId)
    {
        workspaceService.DeleteVolume(bookId, volumeId);
        return Ok(ApiResponse<object>.Success(null));
    }

    [HttpPost("writer/create-volume")]
    public IActionResult CreateVolume([FromBody] CreateVolumeRequestDto dto)
    {
        workspaceService.CreateVolume(dto.BookId, dto.Title, dto.Sort);
        return Ok(ApiResponse<object>.Success(null));
    }

    [HttpPost("writer/update-volume")]
    public IActionResult UpdateVolume([FromBody] UpdateVolumeRequestDto dto)
    {
        workspaceService.UpdateVolume(dto.Id, dto.BookId, dto.Title);
        return Ok(ApiResponse<object>.Success(null));
    }

    // 20. 最后章节（按书）
    [HttpGet("writer/last-chapter")]
    public IActionResult GetLastChapterByBook([FromQuery] int bookId)
    {
        var result = workspaceService.GetLastChapterByBook(bookId);
        return Ok(ApiResponse<LastChapterResponseDto>.Success(result));
    }

    // 21. 最后章节（按卷）
    [HttpGet("writer/last-chapter-by-volume")]
    public IActionResult GetLastChapterByVolume([FromQuery] int bookId, [FromQuery] int volumeId)
    {
        var result = workspaceService.GetLastChapterByVolume(bookId, volumeId);
        return Ok(ApiResponse<LastChapterResponseDto>.Success(result));
    }

    // 22. 最新章节
    [HttpGet("writer/latest-chapter")]
    public IActionResult GetLatestChapter([FromQuery] int bookId)
    {
        var result = workspaceService.GetLatestChapter(bookId);
        return Ok(ApiResponse<LatestChapterResponseDto>.Success(result));
    }
}
