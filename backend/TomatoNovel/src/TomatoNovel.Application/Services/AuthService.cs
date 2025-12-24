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

    public AuthService(IAuthRepository authRepository)
    {
        this.authRepository = authRepository;
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
        // 只返回业务结果，不返回 Token
        // ---------------------------------------------------------------------
        return new LoginOrRegisterResponseDto{
            Id = user.Id,
            Phone = user.Phone,
            Role = user.Role,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            BecomeAuthorAt = user.BecomeAuthorAt?
                .ToString("yyyy-MM-dd HH:mm:ss") ?? string.Empty,
            Signature = user.Signature,
            Level = user.Level,
        };
    }
}
