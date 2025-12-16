namespace TomatoNovel.Application.DTOs.Library.Requests;

public class BookListQueryRequestDto
{
    /// <summary>
    /// Gets or sets 读者频道（男生 / 女生）.
    /// </summary>
    public string? ReaderType { get; set; }

    /// <summary>
    /// Gets or sets 分类组：theme_type | role_type | plot_type.
    /// </summary>
    public string? CategoryGroup { get; set; }

    /// <summary>
    /// Gets or sets 分类类型值（具体分类名）.
    /// </summary>
    public string? CategoryType { get; set; }

    /// <summary>
    /// Gets or sets 连载状态.
    /// </summary>
    public string? Status { get; set; }

    /// <summary>
    /// Gets or sets 字数区间（如：30万以下、50-100万）.
    /// </summary>
    public string? WordCountRange { get; set; }

    /// <summary>
    /// Gets or sets 排序方式：hot | new | words.
    /// </summary>
    public string? Sort { get; set; }

    /// <summary>
    /// Gets or sets 当前页码（默认 1）.
    /// </summary>
    public int Page { get; set; } = 1;

    /// <summary>
    /// Gets or sets 每页条数（默认 10）.
    /// </summary>
    public int PageSize { get; set; } = 10;
}
