namespace TomatoNovel.Api.Middlewares;

using System.Net;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TomatoNovel.Api.Responses;
using TomatoNovel.Application.Exceptions;

/// <summary>
/// Represents the global exception handling middleware that captures unhandled exceptions
/// and converts them into standardized API response structures.
/// </summary>
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    /// <summary>
    /// Initializes a new instance of the <see cref="ExceptionMiddleware"/> class.
    /// </summary>
    /// <param name="next">The next middleware component in the request pipeline.</param>
    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    /// <summary>
    /// Executes the middleware and captures any unhandled exceptions that occur during the request pipeline.
    /// </summary>
    /// <param name="context">The HTTP context for the current request.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    /// <summary>
    /// Handles an exception by mapping known exception types to business error codes and messages,
    /// then generating a standardized JSON response.
    /// </summary>
    /// <param name="context">The HTTP context of the request.</param>
    /// <param name="exception">The exception that was thrown.</param>
    /// <returns>A task that represents writing the JSON error response.</returns>
    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json; charset=utf-8";

        int code = 50000;
        string message = "An unexpected system error has occurred.";
        int httpStatus = (int)HttpStatusCode.OK;

        switch (exception)
        {
            case BusinessException businessException:
                code = businessException.ErrorCode;
                message = businessException.Message;
                break;

            case FluentValidation.ValidationException:
                code = 40001;
                message = "Request validation failed.";
                break;

            case BadHttpRequestException:
                code = 40002;
                message = "Invalid request parameters.";
                break;

            case NotSupportedException:
                code = 40500;
                message = $"HTTP method '{context.Request.Method}' is not allowed.";
                break;

            case DbUpdateException:
                code = 50010;
                message = "A database operation error has occurred.";
                break;

            default:
                code = 50000;
                message = "An unexpected system error has occurred.";
                break;
        }

        var response = ApiResponse<string>.Fail(code, message);

        var json = JsonSerializer.Serialize(
            response,
            new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

        await context.Response.WriteAsync(json);
    }
}
