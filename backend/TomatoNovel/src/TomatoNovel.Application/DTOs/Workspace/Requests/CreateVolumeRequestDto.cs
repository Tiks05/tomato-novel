public class CreateVolumeRequestDto
{
    /// <summary>
    /// 书籍 ID
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// 分卷标题
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// 分卷排序（第几卷）
    /// </summary>
    public int Sort { get; set; }
}
