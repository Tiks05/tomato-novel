public class CreateVolumeRequestDto
{
    /// <summary>
    /// Gets or sets 书籍 ID.
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// Gets or sets 分卷标题.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 分卷排序（第几卷）.
    /// </summary>
    public int Sort { get; set; }
}
