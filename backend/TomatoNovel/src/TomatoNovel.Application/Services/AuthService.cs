namespace TomatoNovel.Application.Services;

using BCrypt.Net;
using TomatoNovel.Application.DTOs.Auth.Requests;
using TomatoNovel.Application.DTOs.Auth.Responses;
using TomatoNovel.Application.Exceptions;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Interfaces;

public class AuthService : IAuthService
{
    private readonly IAuthRepository authRepository;
    private readonly IOpenIddictTokenService tokenService;

    public AuthService(
        IAuthRepository authRepository,
        IOpenIddictTokenService tokenService)
    {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
    }

    public async Task<LoginOrRegisterResponseDto> LoginOrRegisterAsync(
        LoginOrRegisterRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Phone) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            throw new BusinessException(40001, "Phone or password is required.");
        }

        // ---------------------------------------------------------------------
        // 登录 / 自动注册（纯业务逻辑）
        // ---------------------------------------------------------------------
        var user = await this.authRepository.GetUserByPhoneAsync(request.Phone);

        if (user != null)
        {
            if (string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                throw new BusinessException(
                    40002,
                    "Password is not set for this account.");
            }

            if (!BCrypt.Verify(request.Password, user.PasswordHash))
            {
                throw new BusinessException(
                    40003,
                    "Incorrect phone or password.");
            }
        }
        else
        {
            string hash = BCrypt.HashPassword(request.Password);

            user = await this.authRepository.CreateUserAsync(
                phone: request.Phone,
                passwordHash: hash,
                nickname: request.Phone[..3] + "****",
                avatar: "/assets/avatars/icons8-user-pulsar-color-32.png");
        }

        // ---------------------------------------------------------------------
        // 调用 OpenIddict 的 /connect/token（授权层）
        // ---------------------------------------------------------------------
        string accessToken;

        try
        {
            accessToken = await this.tokenService.GenerateTokenAsync(
                username: request.Phone,
                password: request.Password);
        }
        catch (Exception ex)
        {
            throw new BusinessException(
                40004,
                $"Failed to issue access token: {ex.Message}");
        }

        // ---------------------------------------------------------------------
        // 组装返回 DTO（Application → API）
        // ---------------------------------------------------------------------
        return new LoginOrRegisterResponseDto
        {
            User = new UserInfoDto
            {
                Id = user.Id,
                Phone = user.Phone,
                Role = user.Role,
                Nickname = user.Nickname,
                Avatar = user.Avatar,
                BecomeAuthorAt = user.BecomeAuthorAt?
                    .ToString("yyyy-MM-dd HH:mm:ss") ?? string.Empty,
                Signature = user.Signature,
                Level = user.Level,
            },
            AccessToken = accessToken,
        };
    }
}
