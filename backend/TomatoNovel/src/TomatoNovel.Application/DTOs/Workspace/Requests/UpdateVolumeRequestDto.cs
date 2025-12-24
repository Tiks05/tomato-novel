public class UpdateVolumeRequestDto
{
    /// <summary>
    /// Gets or sets 分卷 ID.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets 书籍 ID.
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// Gets or sets 分卷标题.
    /// </summary>
    public string Title { get; set; } = string.Empty;
}
