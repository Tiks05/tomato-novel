namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.WriterInfo.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/writer-info")]
public class WriterInfoController : ControllerBase
{
    private readonly IWriterInfoService writerInfoService;

    public WriterInfoController(IWriterInfoService writerInfoService)
    {
        this.writerInfoService = writerInfoService;
    }

    [HttpGet("header/{writerId}")]
    [AllowAnonymous]
    [ProducesResponseType(
        typeof(ApiResponse<WriterHeaderResponseDto>),
        StatusCodes.Status200OK)]
    public IActionResult GetWriterHeader(int writerId)
    {
        try
        {
            var result = this.writerInfoService.GetWriterHeader(writerId);
            return this.Ok(ApiResponse<WriterHeaderResponseDto>.Success(result));
        }
        catch (Exception ex)
        {
            return this.Ok(ApiResponse<object>.Fail(40020, ex.Message));
        }
    }

    [HttpGet("works/{writerId}")]
    [AllowAnonymous]
    [ProducesResponseType(
        typeof(ApiResponse<WriterWorksResponseDto>),
        StatusCodes.Status200OK)]
    public IActionResult GetWriterWorks(int writerId)
    {
        try
        {
            var result = this.writerInfoService.GetWriterWorks(writerId);
            return this.Ok(ApiResponse<WriterWorksResponseDto>.Success(result));
        }
        catch (Exception ex)
        {
            return this.Ok(ApiResponse<object>.Fail(40021, ex.Message));
        }
    }
}
