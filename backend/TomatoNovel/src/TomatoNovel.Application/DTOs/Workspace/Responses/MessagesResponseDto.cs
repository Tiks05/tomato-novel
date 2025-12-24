namespace TomatoNovel.Application.DTOs.Workspace.Responses;

/// <summary>
/// Response DTO for user message list.
/// </summary>
public class MessagesResponseDto
{
    /// <summary>
    /// Gets or sets the message items.
    /// </summary>
    public List<MessageItemDto> Items { get; set; } = new();

    /// <summary>
    /// Gets or sets the total message count.
    /// </summary>
    public int TotalCount { get; set; }
}
