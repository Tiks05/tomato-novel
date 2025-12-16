namespace TomatoNovel.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.DTOs.Common.Requests;
using TomatoNovel.Application.DTOs.Common.Responses;
using TomatoNovel.Application.Interfaces;

[ApiController]
[Route("api/common")]
public class CommonController : ControllerBase
{
    private readonly ICommonService commonService;

    public CommonController(ICommonService commonService)
    {
        this.commonService = commonService;
    }

    /// <summary>
    /// 获取 Banner 列表.
    /// </summary>
    /// <returns></returns>
    [HttpGet("banner-list")]
    [AllowAnonymous]
    [ProducesResponseType(
        typeof(ApiResponse<BannerListResponseDto>),
        StatusCodes.Status200OK)]
    public IActionResult GetBannerList([FromQuery] BannerListRequestDto request)
    {
        try
        {
            var response = this.commonService.GetBannerList(request);
            return this.Ok(ApiResponse<BannerListResponseDto>.Success(response));
        }
        catch (Exception ex)
        {
            return this.Ok(ApiResponse<object>.Fail(
                40010,
                ex.Message));
        }
    }

    [HttpGet("adaptlist")]
    [AllowAnonymous]
    public IActionResult GetAdaptList([FromQuery] AdaptListRequestDto request)
    {
        var result = this.commonService.GetAdaptList(request);
        return this.Ok(ApiResponse<AdaptListResponseDto>.Success(result));
    }
}
