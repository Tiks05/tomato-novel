// -----------------------------------------------------------------------------
// OpenIddict token endpoint controller.
// This controller is responsible ONLY for OAuth2/OpenID Connect protocol handling.
// -----------------------------------------------------------------------------

namespace TomatoNovel.Api.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using TomatoNovel.Infrastructure.Persistence;

[ApiController]
public class OpenIddictController : ControllerBase
{
    private readonly TomatoNovelDbContext dbContext;

    public OpenIddictController(TomatoNovelDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    /// <summary>
    /// OAuth2 / OpenID Connect token endpoint.
    /// ⚠️ 注意：不做密码校验，只做 Token 颁发.
    /// </summary>
    /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
    [HttpPost("~/connect/token")]
    [AllowAnonymous]
    [Consumes("application/x-www-form-urlencoded")]
    [Produces("application/json")]
    public async Task<IActionResult> ExchangeAsync()
    {
        var request = this.HttpContext.GetOpenIddictServerRequest()
            ?? throw new InvalidOperationException("无法获取 OpenIddict 请求参数");

        // ---------------------------------------------------------------------
        // Password Grant（不校验密码）
        // ---------------------------------------------------------------------
        if (request.IsPasswordGrantType())
        {
            if (string.IsNullOrWhiteSpace(request.Username))
            {
                return this.BadRequest(new
                {
                    error = "invalid_request",
                    error_description = "用户名不能为空",
                });
            }

            // ⚠️ 只确认用户存在（密码已在 AuthService 校验过）
            var user = await this.dbContext.Users
                .SingleOrDefaultAsync(u => u.Phone == request.Username);

            if (user == null)
            {
                return this.BadRequest(new
                {
                    error = "invalid_grant",
                    error_description = "用户不存在",
                });
            }

            // -----------------------------------------------------------------
            // 创建 ClaimsIdentity
            // -----------------------------------------------------------------
            var identity = new ClaimsIdentity(
                OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                OpenIddictConstants.Claims.Name,
                OpenIddictConstants.Claims.Role);

            // ----------------------------
            // OIDC 标准 Claims
            // ----------------------------
            identity.AddClaim(new Claim(
                OpenIddictConstants.Claims.Subject,
                user.Id.ToString()));

            identity.AddClaim(new Claim(
                OpenIddictConstants.Claims.Name,
                user.Nickname ?? user.Phone));

            if (!string.IsNullOrWhiteSpace(user.Role))
            {
                identity.AddClaim(new Claim(
                    OpenIddictConstants.Claims.Role,
                    user.Role));
            }

            // ----------------------------
            // 业务自定义 Claims
            // ----------------------------
            identity.AddClaim(new Claim("phone", user.Phone));
            identity.AddClaim(new Claim("avatar", user.Avatar ?? string.Empty));
            identity.AddClaim(new Claim("level", user.Level.ToString()));

            // ----------------------------
            // Claim → Token 映射
            // ----------------------------
            identity.SetDestinations(claim => claim.Type switch
            {
                OpenIddictConstants.Claims.Subject
                    => new[] { OpenIddictConstants.Destinations.AccessToken },

                OpenIddictConstants.Claims.Name or
                OpenIddictConstants.Claims.Role
                    => new[]
                    {
                        OpenIddictConstants.Destinations.AccessToken,
                        OpenIddictConstants.Destinations.IdentityToken,
                    },

                _ => new[] { OpenIddictConstants.Destinations.AccessToken },
            });

            return this.SignIn(
                new ClaimsPrincipal(identity),
                OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        // ---------------------------------------------------------------------
        // Refresh Token Grant
        // ---------------------------------------------------------------------
        if (request.IsRefreshTokenGrantType())
        {
            var authenticateResult =
                await this.HttpContext.AuthenticateAsync(
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

            if (!authenticateResult.Succeeded)
            {
                return this.BadRequest(new
                {
                    error = "invalid_grant",
                    error_description = "刷新令牌无效或已过期",
                });
            }

            return this.SignIn(
                authenticateResult.Principal!,
                OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        // ---------------------------------------------------------------------
        // Unsupported Grant
        // ---------------------------------------------------------------------
        return this.BadRequest(new
        {
            error = "unsupported_grant_type",
            error_description = "不支持的授权模式",
        });
    }
}
