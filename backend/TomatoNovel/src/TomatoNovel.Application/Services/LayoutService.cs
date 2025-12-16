namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.Layout.Requests;
using TomatoNovel.Application.DTOs.Layout.Responses;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Interfaces;

public class LayoutService : ILayoutService
{
    private readonly ILayoutRepository layoutRepository;

    public LayoutService(ILayoutRepository layoutRepository)
    {
        this.layoutRepository = layoutRepository;
    }

    public UserProfileUpdateResponseDto UpdateUserProfile(
        long id,
        string name,
        string introduction,
        Stream? avatarStream)
    {
        var user = this.layoutRepository.GetUserById(id);
        if (user == null)
        {
            throw new Exception("用户不存在");
        }

        // 更新基础信息
        user.Nickname = name;
        user.Signature = introduction;

        // 只做一件事：生成 UUID
        string? avatarUuid = null;
        if (avatarStream != null)
        {
            avatarUuid = Guid.NewGuid().ToString("N");
        }

        // 把“业务决定”交给 Repository
        this.layoutRepository.UpdateUser(
            user,
            avatarStream,
            avatarUuid);

        return new UserProfileUpdateResponseDto
        {
            Avatar = user.Avatar,
            Nickname = user.Nickname,
            Signature = user.Signature,
        };
    }

    public SearchBookResponseDto SearchBooks(SearchBookRequestDto request)
    {
        // -----------------------------
        // 1️⃣ 参数兜底
        // -----------------------------
        var page = request.Page <= 0 ? 1 : request.Page;
        var pageSize = request.PageSize <= 0 ? 10 : request.PageSize;

        // -----------------------------
        // 2️⃣ 查询总数
        // -----------------------------
        var total = this.layoutRepository.CountBooks(
            request.Keyword,
            request.StateIndex,
            request.NumIndex,
            request.TimeIndex);

        // -----------------------------
        // 3️⃣ 查询当前页数据
        // -----------------------------
        var books = this.layoutRepository.SearchBooks(
            request.Keyword,
            request.StateIndex,
            request.NumIndex,
            request.TimeIndex,
            request.Type,
            page,
            pageSize);

        // -----------------------------
        // 4️⃣ 映射为 SearchBookItemDto
        // -----------------------------
        var records = books.Select(x =>
        {
            // 书籍详情页
            var bookPath = $"/book/{x.BookId}";

            // 第一章阅读路径
            var readPath = bookPath;
            if (x.FirstVolumeSort.HasValue && x.FirstChapterNum.HasValue)
            {
                readPath = $"{bookPath}/{x.FirstVolumeSort}/{x.FirstChapterNum}";
            }

            // 最新章节阅读路径
            var updatePath = bookPath;
            if (x.LatestVolumeSort.HasValue && x.LatestChapterNum.HasValue)
            {
                updatePath = $"{bookPath}/{x.LatestVolumeSort}/{x.LatestChapterNum}";
            }

            return new SearchBookItemDto
            {
                Title = x.Title,
                Author = x.Author,
                Status = x.Status,
                WordCount = x.WordCount,
                Intro = x.Intro,
                Pic = x.CoverUrl,

                People = x.FavoriteCount,

                Update = x.LatestChapterTitle ?? string.Empty,
                UpdatedAt = x.UpdatedAt.ToString("yyyy-MM-dd"),

                Path = bookPath,
                ReadPath = readPath,
                UpdatePath = updatePath,
            };
        }).ToList();

        // -----------------------------
        // 5️⃣ 返回结果
        // -----------------------------
        return new SearchBookResponseDto
        {
            Total = total,
            Records = records,
        };
    }
}
