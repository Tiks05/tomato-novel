namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.Common.Requests;
using TomatoNovel.Application.DTOs.Common.Responses;
using TomatoNovel.Application.Exceptions;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Interfaces;

public class CommonService : ICommonService
{
    private readonly ICommonRepository commonRepository;

    public CommonService(ICommonRepository commonRepository)
    {
        this.commonRepository = commonRepository;
    }

    public BannerListResponseDto GetBannerList(BannerListRequestDto request)
    {
        // ---------------------------------------------------------------------
        // 参数校验（业务层）
        // ---------------------------------------------------------------------
        if (request == null)
        {
            throw new BusinessException(
                40011,
                "Request cannot be null.");
        }

        if (request.Limit <= 0)
        {
            throw new BusinessException(
                40012,
                "Limit must be greater than zero.");
        }

        // ---------------------------------------------------------------------
        // 查询 Banner 数据（纯业务逻辑）
        // ---------------------------------------------------------------------
        var records = this.commonRepository.GetBannerNews(request.Limit);

        // ---------------------------------------------------------------------
        // 组装返回 DTO（Application → API）
        // ---------------------------------------------------------------------
        return new BannerListResponseDto
        {
            Items = records.Select(record => new BannerItemDto
            {
                BannerUrl = record.BannerUrl ?? string.Empty,
                Path = $"/classroom/{record.Id}"
            }).ToList()
        };
    }

    public AdaptListResponseDto GetAdaptList(AdaptListRequestDto request)
    {
        var data = commonRepository.GetAdaptBooks(request.Limit);

        return new AdaptListResponseDto
        {
            Data = data.Select(b => new AdaptBookResponseDto
            {
                Id = b.Id,
                Pic = b.CoverUrl ?? string.Empty,
                Path = $"/bookinfo/{b.Id}"
            }).ToList()
        };
    }
}
