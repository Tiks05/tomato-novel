public class UpdateVolumeRequestDto
{
    /// <summary>
    /// 分卷 ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// 书籍 ID
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// 分卷标题
    /// </summary>
    public string Title { get; set; } = string.Empty;
}
