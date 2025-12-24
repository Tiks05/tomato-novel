namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.Workspace.Requests;
using TomatoNovel.Application.DTOs.Workspace.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/workspace")]
public class WorkspaceController : ControllerBase
{
    private readonly IWorkspaceService workspaceService;

    public WorkspaceController(IWorkspaceService workspaceService)
    {
        this.workspaceService = workspaceService;
    }

    // 1. 申请作家
    [HttpPost("apply")]
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
                avatarStream);

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
    public IActionResult GetWriterStats([FromRoute] int userId)
    {
        var result = this.workspaceService.GetWriterStats(userId);
        return this.Ok(ApiResponse<WriterStatsResponseDto>.Success(result));
    }

    // 3. 公告列表
    [HttpGet("writer/notice-list")]
    public IActionResult GetNoticeList([FromQuery] int limit = 3)
    {
        var result = this.workspaceService.GetNoticeList(limit);
        return this.Ok(ApiResponse<NoticeListResponseDto>.Success(result));
    }

    // 4. 活动列表
    [HttpGet("writer/news-list")]
    public IActionResult GetNewsList([FromQuery] int limit = 4)
    {
        var result = this.workspaceService.GetNewsList(limit);
        return this.Ok(ApiResponse<NewsListResponseDto>.Success(result));
    }

    // 5. 榜单
    [HttpGet("writer/book-rank")]
    public IActionResult GetBookRank([FromQuery] string type, [FromQuery] string category)
    {
        var result = this.workspaceService.GetBookRank(type, category);
        return this.Ok(ApiResponse<BookRankResponseDto>.Success(result));
    }

    // 6. 创建书籍
    [HttpPost("writer/create-book")]
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

            this.workspaceService.CreateBook(
                id,
                name,
                reader_type,
                tag,
                hero1,
                hero2,
                introduction,
                coverStream);

            return this.Ok(ApiResponse<object>.Success(null));
        }
        catch (Exception ex)
        {
            var msg = ex.InnerException?.Message ?? ex.Message;
            return this.Ok(ApiResponse<object>.Fail(500, msg));
        }
    }

    // 7. 我的书籍
    [HttpGet("writer/my-book-list")]
    public IActionResult GetMyBookList([FromQuery] MyBookListRequestDto request)
    {
        var result = this.workspaceService.GetMyBookList(request);
        return this.Ok(ApiResponse<MyBookListResponseDto>.Success(result));
    }

    // 8. 书籍详情
    [HttpGet("writer/book-overview/{bookId:int}")]
    public IActionResult GetBookOverview([FromRoute] int bookId)
    {
        var result = this.workspaceService.GetBookDetail(bookId);
        return this.Ok(ApiResponse<BookDetailResponseDto>.Success(result));
    }

    // 9. 删除书籍
    [HttpDelete("writer/delete-book/{bookId:int}")]
    public IActionResult DeleteBook([FromRoute] int bookId)
    {
        this.workspaceService.DeleteBook(bookId);
        return this.Ok(ApiResponse<object>.Success(null));
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

            this.workspaceService.UpdateBook(
                book_id,
                name,
                reader_type,
                tag,
                hero1,
                hero2,
                introduction,
                coverStream);

            return this.Ok(ApiResponse<object>.Success(null));
        }
        catch (Exception ex)
        {
            var msg = ex.InnerException?.Message ?? ex.Message;
            return this.Ok(ApiResponse<object>.Fail(500, msg));
        }
    }

    // 11. 最近章节信息
    [HttpGet("writer/get-last-chapterInfo")]
    public IActionResult GetLastChapterInfo([FromQuery] int bookId)
    {
        var result = this.workspaceService.GetLastChapterInfo(bookId);
        return this.Ok(ApiResponse<LastChapterInfoResponseDto>.Success(result));
    }

    // 12. 创建章节
    [HttpPost("writer/create-chapter")]
    public IActionResult CreateChapter([FromBody] ChapterCreateRequestDto request)
    {
        this.workspaceService.CreateChapter(request);
        return this.Ok(ApiResponse<object>.Success(null));
    }

    // 13. 章节列表
    [HttpGet("writer/chapter-list")]
    public IActionResult GetChapterList([FromQuery] ChapterListRequestDto request)
    {
        var result = this.workspaceService.GetChapterList(request);
        return this.Ok(ApiResponse<ChapterListResponseDto>.Success(result));
    }

    // 14. 删除章节
    [HttpDelete("writer/delete-chapter/{chapterId:int}")]
    public IActionResult DeleteChapter([FromRoute] int chapterId)
    {
        this.workspaceService.DeleteChapter(chapterId);
        return this.Ok(ApiResponse<object>.Success(null));
    }

    // 15. 更新章节
    [HttpPost("writer/update-chapter")]
    public IActionResult UpdateChapter([FromBody] ChapterUpdateRequestDto request)
    {
        this.workspaceService.UpdateChapter(request);
        return this.Ok(ApiResponse<object>.Success(null));
    }

    // 16. 章节详情
    [HttpGet("writer/chapter-detail")]
    public IActionResult GetChapterDetail([FromQuery] ChapterDetailRequestDto dto)
    {
        var result = this.workspaceService.GetChapterDetail(dto.BookId, dto.ChapterId);
        return this.Ok(ApiResponse<ChapterDetailResponseDto>.Success(result));
    }

    // 17. 删除分卷
    [HttpDelete("writer/delete-volume")]
    public IActionResult DeleteVolume([FromQuery] int bookId, [FromQuery] int volumeId)
    {
        this.workspaceService.DeleteVolume(bookId, volumeId);
        return this.Ok(ApiResponse<object>.Success(null));
    }

    [HttpPost("writer/create-volume")]
    public IActionResult CreateVolume([FromBody] CreateVolumeRequestDto dto)
    {
        this.workspaceService.CreateVolume(dto.BookId, dto.Title, dto.Sort);
        return this.Ok(ApiResponse<object>.Success(null));
    }

    [HttpPost("writer/update-volume")]
    public IActionResult UpdateVolume([FromBody] UpdateVolumeRequestDto dto)
    {
        this.workspaceService.UpdateVolume(dto.Id, dto.BookId, dto.Title);
        return this.Ok(ApiResponse<object>.Success(null));
    }

    // 20. 最后章节（按书）
    [HttpGet("writer/last-chapter")]
    public IActionResult GetLastChapterByBook([FromQuery] int bookId)
    {
        var result = this.workspaceService.GetLastChapterByBook(bookId);
        return this.Ok(ApiResponse<LastChapterResponseDto>.Success(result));
    }

    // 21. 最后章节（按卷）
    [HttpGet("writer/last-chapter-by-volume")]
    public IActionResult GetLastChapterByVolume([FromQuery] int bookId, [FromQuery] int volumeId)
    {
        var result = this.workspaceService.GetLastChapterByVolume(bookId, volumeId);
        return this.Ok(ApiResponse<LastChapterResponseDto>.Success(result));
    }

    // 22. 最新章节
    [HttpGet("writer/latest-chapter")]
    public IActionResult GetLatestChapter([FromQuery] int bookId)
    {
        var result = this.workspaceService.GetLatestChapter(bookId);
        return this.Ok(ApiResponse<LatestChapterResponseDto>.Success(result));
    }

    // 23. 作家消息列表
    [HttpGet("writer/messages")]
    public IActionResult GetWriterMessages([FromQuery] GetUserMessagesRequestDto request)
    {
        var result = this.workspaceService.GetUserMessages(request);
        return this.Ok(ApiResponse<MessagesResponseDto>.Success(result));
    }

    // 24. 标记消息为已读
    [HttpPost("writer/messages/read")]
    public IActionResult MarkMessagesAsRead([FromBody] MarkMessagesAsReadRequestDto request)
    {
        this.workspaceService.MarkMessagesAsRead(request);
        return this.Ok(ApiResponse<object>.Success(null));
    }
}
