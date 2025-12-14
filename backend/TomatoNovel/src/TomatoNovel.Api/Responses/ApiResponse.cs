namespace TomatoNovel.Api.Responses;

/// <summary>
/// Represents a standardized API response wrapper containing a status code,
/// message, and optional data payload.
/// </summary>
/// <typeparam name="T">The type of the data payload included in the response.</typeparam>
public class ApiResponse<T>
{
    /// <summary>
    /// Gets or sets the business status code associated with the response.
    /// </summary>
    public int Code { get; set; }

    /// <summary>
    /// Gets or sets the message describing the response result.
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the optional data payload returned by the API.
    /// </summary>
    public T? Data { get; set; }

    /// <summary>
    /// Creates a success response containing the specified data.
    /// </summary>
    /// <param name="data">The data payload to include in the response.</param>
    /// <param name="message">The success message.</param>
    /// <returns>A new <see cref="ApiResponse{T}"/> instance.</returns>
    public static ApiResponse<T> Success(T data, string message = "Success")
    {
        return new ApiResponse<T>
        {
            Code = 0,
            Message = message,
            Data = data
        };
    }

    /// <summary>
    /// Creates a failure response with the specified error code and message.
    /// </summary>
    /// <param name="code">The business error code.</param>
    /// <param name="message">The error message.</param>
    /// <returns>A new <see cref="ApiResponse{T}"/> instance.</returns>
    public static ApiResponse<T> Fail(int code, string message)
    {
        return new ApiResponse<T>
        {
            Code = code,
            Message = message,
            Data = default
        };
    }
}
