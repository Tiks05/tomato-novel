namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.Writer.Requests;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/writer")]
[AllowAnonymous]
public class WriterController : ControllerBase
{
    private readonly IWriterService writerService;

    public WriterController(IWriterService writerService)
    {
        this.writerService = writerService;
    }

    /// <summary>
    /// 获取作家资讯列表.
    /// </summary>
    /// <returns></returns>
    [HttpGet("news")]
    public IActionResult GetNewsList([FromQuery] WriterNewsQueryRequestDto request)
    {
        var result = this.writerService.GetNewsList(request);
        return this.Ok(ApiResponse<object>.Success(result));
    }

    /// <summary>
    /// 获取作家课堂列表.
    /// </summary>
    /// <returns></returns>
    [HttpGet("classroom")]
    public IActionResult GetClassroomList(
        [FromQuery] WriterClassroomQueryRequestDto request)
    {
        var result = this.writerService.GetClassroomList(request);
        return this.Ok(ApiResponse<object>.Success(result));
    }
}
