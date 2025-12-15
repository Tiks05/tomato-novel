namespace TomatoNovel.Application.Exceptions;

/// <summary>
/// Represents a business-level exception that contains an application-specific error code
/// and a human-readable message.
/// </summary>
public class BusinessException : Exception
{
    /// <summary>
    /// Gets the application-specific error code associated with the exception.
    /// </summary>
    public int ErrorCode { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="BusinessException"/> class.
    /// </summary>
    /// <param name="errorCode">The business error code.</param>
    /// <param name="message">The error message.</param>
    public BusinessException(int errorCode, string message)
        : base(message)
    {
        this.ErrorCode = errorCode;
    }
}
