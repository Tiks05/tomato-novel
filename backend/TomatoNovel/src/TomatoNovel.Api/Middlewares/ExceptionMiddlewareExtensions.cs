namespace TomatoNovel.Api.Middlewares;

using Microsoft.AspNetCore.Builder;

/// <summary>
/// Provides extension methods for registering the <see cref="ExceptionMiddleware"/>
/// in the application's HTTP request pipeline.
/// </summary>
public static class ExceptionMiddlewareExtensions
{
    /// <summary>
    /// Adds the global exception handling middleware to the HTTP request pipeline.
    /// </summary>
    /// <param name="app">The application builder used to configure the middleware pipeline.</param>
    /// <returns>The same <see cref="IApplicationBuilder"/> instance for method chaining.</returns>
    public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionMiddleware>();
    }
}
