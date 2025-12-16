namespace TomatoNovel.Application.DTOs.Layout.Requests;

public class SearchBookRequestDto
{
    /// <summary>
    /// 搜索关键词（书名 / 作者）
    /// </summary>
    public string? Keyword { get; set; }

    /// <summary>
    /// 排序方式
    /// 0 - 相关（默认）
    /// 1 - 最热
    /// 2 - 最新
    /// </summary>
    public int Type { get; set; } = 0;

    /// <summary>
    /// 更新时间索引
    /// 0 - 全部（默认）
    /// 1 - 过去三十分钟
    /// 2 - 今天
    /// 3 - 本周
    /// 4 - 本月
    /// 5 - 今年
    /// </summary>
    public int TimeIndex { get; set; } = 0;

    /// <summary>
    /// 字数区间索引
    /// 0 - 全部（默认）
    /// 1 - 30万字以下
    /// 2 - 30-50万
    /// 3 - 50-100万
    /// 4 - 100-200万
    /// </summary>
    public int NumIndex { get; set; } = 0;

    /// <summary>
    /// 连载状态索引
    /// 0 - 全部（默认）
    /// 1 - 已完结
    /// 2 - 连载中
    /// </summary>
    public int StateIndex { get; set; } = 0;

    /// <summary>
    /// 当前页，从 1 开始
    /// </summary>
    public int Page { get; set; } = 1;

    /// <summary>
    /// 每页条数
    /// </summary>
    public int PageSize { get; set; } = 20;
}
