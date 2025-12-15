namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.Common.Requests;
using TomatoNovel.Application.DTOs.Common.Responses;

public interface ICommonService
{
    BannerListResponseDto GetBannerList(BannerListRequestDto request);

    AdaptListResponseDto GetAdaptList(AdaptListRequestDto request);
}
