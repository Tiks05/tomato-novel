namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.Auth.Requests;
using TomatoNovel.Application.DTOs.Auth.Responses;

public interface IAuthService
{
    Task<LoginOrRegisterResponseDto> LoginOrRegisterAsync(LoginOrRegisterRequestDto request);
}
