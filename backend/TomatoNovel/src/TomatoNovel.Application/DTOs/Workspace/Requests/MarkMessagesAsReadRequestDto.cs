namespace TomatoNovel.Application.DTOs.Workspace.Requests;

/// <summary>
/// Request DTO for marking messages as read.
/// </summary>
public class MarkMessagesAsReadRequestDto
{
    /// <summary>
    /// Gets or sets the message id list to mark as read.
    /// </summary>
    public List<int> MessageIds { get; set; } = new();
}
