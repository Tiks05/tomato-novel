namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.Workspace.Requests;
using TomatoNovel.Application.DTOs.Workspace.Responses;
using TomatoNovel.Application.Exceptions;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;

public class WorkspaceService : IWorkspaceService
{
    private readonly IWorkspaceRepository repository;

    public WorkspaceService(IWorkspaceRepository repository)
    {
        this.repository = repository;
    }

    // 1. 申请作家
    public AuthorApplyResponseDto ApplyAuthor(
        long userId,
        string name,
        string introduction,
        Stream? avatarStream)
    {
        // -----------------------------
        // 1. 查询用户
        // -----------------------------
        var user = this.repository.GetUser(userId);
        if (user == null)
        {
            throw new Exception("用户不存在");
        }

        // -----------------------------
        // 2. 更新作家基础信息（纯业务）
        // -----------------------------
        user.Nickname = name;
        user.Signature = introduction;
        user.Role = "author";
        user.AuthorLevel = "签约作家";
        user.BecomeAuthorAt = DateTime.UtcNow;

        // -----------------------------
        // 3. 是否需要处理头像（业务决定）
        // -----------------------------
        string? avatarUuid = null;
        if (avatarStream != null)
        {
            avatarUuid = Guid.NewGuid().ToString("N");
        }

        // -----------------------------
        // 4. 把“如何更新”交给 Repository
        // -----------------------------
        this.repository.UpdateAuthor(
            user,
            avatarStream,
            avatarUuid);

        // -----------------------------
        // 5. 返回响应
        // -----------------------------
        return new AuthorApplyResponseDto
        {
            Avatar = user.Avatar,
            Nickname = user.Nickname,
            Signature = user.Signature,
            BecomeAuthorAt = user.BecomeAuthorAt?
                .ToString("yyyy-MM-dd HH:mm:ss"),
        };
    }

    // 2. 作家统计
    public WriterStatsResponseDto GetWriterStats(int userId)
    {
        var books = this.repository.GetBooksByUser(userId);

        var totalWords = books.Sum(b => b.WordCount ?? 0);

        // 目前与你 Python 版一致：模拟粉丝数
        var fansCount = new Random().Next(30000, 150000);

        return new WriterStatsResponseDto
        {
            FansCount = fansCount,
            TotalWords = totalWords,
        };
    }

    // 3. 公告列表
    public NoticeListResponseDto GetNoticeList(int limit)
    {
        var notices = this.repository.GetNotices(limit);

        return new NoticeListResponseDto
        {
            Items = notices.Select(n => new NoticeItemDto
            {
                NoticeUrl = n.NoticeUrl ?? string.Empty,
                Title = n.Title,
                Time = n.UpdatedAt.ToString("MM.dd"),
                Path = $"/newsinfo/{n.Id}"
            }).ToList(),
        };
    }

    // 4. 活动列表
    public NewsListResponseDto GetNewsList(int limit)
    {
        var news = this.repository.GetNews(limit);

        return new NewsListResponseDto
        {
            Items = news.Select(n => new NewsItemDto
            {
                Title = n.Title,
                Path = $"/newsinfo/{n.Id}"
            }).ToList(),
        };
    }

    // 5. 榜单
    public BookRankResponseDto GetBookRank(string readerType, string category)
    {
        var books = this.repository.GetRankBooks(readerType, category);

        var items = books.Select((b, index) => new BookRankItemDto
        {
            Num = index + 1,
            Title = b.Title,
            Path = $"/bookinfo/{b.Id}",
            Pic = b.CoverUrl ?? string.Empty,
            Author = b.Author?.Nickname ?? string.Empty,
            Desc = b.Intro ?? string.Empty,
        }).ToList();

        return new BookRankResponseDto
        {
            PlotType = category,
            Child = items,
        };
    }

    // 6. 创建书籍
    public void CreateBook(
        long userId,
        string name,
        int readerType,
        string tag,
        string hero1,
        string hero2,
        string introduction,
        Stream? coverStream)
    {
        string readerTypeText = readerType switch
        {
            1 => "男生",
            2 => "女生",
            _ => "未知",
        };

        var hero = string.Join(
            " / ",
            new[] { hero1, hero2 }
                .Where(h => !string.IsNullOrWhiteSpace(h)));

        string? coverUuid = null;
        if (coverStream != null)
        {
            coverUuid = Guid.NewGuid().ToString("N");
        }

        var user = this.repository.GetUser((int)userId);

        var book = new Book
        {
            UserId = (int)userId,
            Title = name,
            ReaderType = readerTypeText,
            Tags = tag,
            Hero = hero,
            Intro = string.IsNullOrWhiteSpace(introduction)
                ? "新作品出炉，欢迎大家阅读！"
                : introduction,

            Status = "连载中",
            SignStatus = "未签约",

            WordCount = 0,
            WordCountRange = "30万以下",

            FavoriteCount = 0,
            CoverUrl = "/uploads/covers/default_cover.png",

            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        this.repository.AddBook(book, coverStream, coverUuid);
        this.repository.SaveChanges();
    }

    // 7. 我的书籍
    public MyBookListResponseDto GetMyBookList(MyBookListRequestDto request)
    {
        var books = this.repository.GetBooksByUser(request.UserId);

        var items = books.Select(b =>
        {
            var volumes = this.repository.GetVolumesByBook(b.Id);

            var chapters = volumes
                .SelectMany(v => this.repository.GetChaptersByVolume(v.Id))
                .ToList();

            var latestChapter = chapters
                .OrderByDescending(c => c.CreatedAt)
                .FirstOrDefault();

            return new MyBookItemDto
            {
                Id = b.Id,
                Title = b.Title,
                Pic = b.CoverUrl ?? string.Empty,
                LatestChapterTitle = latestChapter?.Title ?? "暂无章节",
                LatestChapterNum = latestChapter?.ChapterNum ?? 0,
                TotalChapters = chapters.Count,
                Words = chapters.Sum(c => c.WordCount ?? 0),
                Status = b.Status ?? "连载中",
                Path = $"/bookinfo/{b.Id}",
                State = b.State,
            };
        }).ToList();

        return new MyBookListResponseDto
        {
            Books = items
        };
    }


    // 8. 书籍详情
    public BookDetailResponseDto GetBookDetail(int bookId)
    {
        var book = this.repository.GetBook(bookId);

        return new BookDetailResponseDto
        {
            Id = book.Id,
            Title = book.Title,
            CoverUrl = book.CoverUrl ?? string.Empty,
            TargetReaders = book.ReaderType ?? "-",
            Tags = book.Tags ?? "-",
            MainRoles = book.Hero ?? "-",
            Intro = book.Intro ?? string.Empty,
            CreatedAt = book.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
            Status = "正常",
            ContractStatus = book.SignStatus,
            UpdateStatus = book.Status ?? "连载中",
        };
    }

    // 9. 删除书籍
    public void DeleteBook(int bookId)
    {
        var book = this.repository.GetBook(bookId);
        this.repository.RemoveBook(book);
        this.repository.SaveChanges();
    }

    // 10. 更新书籍
    public void UpdateBook(
        long bookId,
        string name,
        int readerType,
        string tag,
        string hero1,
        string hero2,
        string introduction,
        Stream? coverStream)
    {
        var book = this.repository.GetBook((int)bookId);

        // readerType 转文字（和 CreateBook 保持一致）
        string readerTypeText = readerType switch
        {
            1 => "男生",
            2 => "女生",
            _ => "未知",
        };

        // 主角拼接逻辑（和 CreateBook 一致）
        var hero = string.Join(
            " / ",
            new[] { hero1, hero2 }
                .Where(h => !string.IsNullOrWhiteSpace(h)));

        book.Title = name;
        book.ReaderType = readerTypeText;
        book.Tags = tag;
        book.Hero = hero;
        book.Intro = string.IsNullOrWhiteSpace(introduction)
            ? book.Intro
            : introduction;

        book.UpdatedAt = DateTime.UtcNow;

        // ---------- 封面处理 ----------
        if (coverStream != null)
        {
            var coverUuid = Guid.NewGuid().ToString("N");

            this.repository.UpdateBook(
                book,
                coverStream,
                coverUuid);
        }

        this.repository.SaveChanges();
    }

    // 11. 最近章节信息
    public LastChapterInfoResponseDto GetLastChapterInfo(int bookId)
    {
        var volume = this.repository.GetLastVolume(bookId);
        if (volume == null)
        {
            return new LastChapterInfoResponseDto();
        }

        var chapter = this.repository.GetLastChapterByVolume(volume.Id);
        if (chapter == null)
        {
            return new LastChapterInfoResponseDto();
        }

        return new LastChapterInfoResponseDto
        {
            VolumeIndex = volume.Sort,
            VolumeTitle = volume.Title,
            ChapterIndex = chapter.ChapterNum,
            ChapterTitle = chapter.Title,
        };
    }

    // 12. 创建章节
    public void CreateChapter(ChapterCreateRequestDto request)
    {
        Volume volume;

        if (request.VolumeId.HasValue)
        {
            volume = this.repository.GetVolume(request.VolumeId.Value)
                ?? throw new BusinessException(40004, "分卷不存在");
        }
        else
        {
            volume = this.repository.GetLastVolume(request.BookId)
                ?? new Volume
                {
                    BookId = request.BookId,
                    Title = "第一卷",
                    Sort = 1,
                    CreatedAt = DateTime.UtcNow,
                };

            if (volume.Id == 0)
            {
                this.repository.AddVolume(volume);
                this.repository.SaveChanges();
            }
        }

        var lastChapter = this.repository.GetLastChapterByVolume(volume.Id);
        var nextNum = (lastChapter?.ChapterNum ?? 0) + 1;

        var chapter = new Chapter
        {
            VolumeId = volume.Id,
            ChapterNum = nextNum,
            Title = request.Title,
            Content = request.Content,
            WordCount = request.WordCount,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        this.repository.AddChapter(chapter);
        this.repository.SaveChanges();
    }

    // 13. 章节列表
    public ChapterListResponseDto GetChapterList(ChapterListRequestDto request)
    {
        if (request.BookId <= 0)
        {
            throw new BusinessException(40003, "BookId 无效");
        }

        var book = this.repository.GetBook(request.BookId);
        if (book == null)
        {
            throw new BusinessException(40004, "书籍不存在");
        }

        var volumes = this.repository.GetVolumesByBook(request.BookId).ToList();
        var chapters = this.repository.GetChaptersByBook(request.BookId);

        if (!string.IsNullOrWhiteSpace(request.Title))
        {
            chapters = chapters.Where(c => c.Title.Contains(request.Title));
        }

        if (!string.IsNullOrWhiteSpace(request.VolumeId)
            && int.TryParse(request.VolumeId, out var volumeId))
        {
            chapters = chapters.Where(c => c.VolumeId == volumeId);
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            chapters = chapters.Where(c => c.Status == request.Status);
        }

        return new ChapterListResponseDto
        {
            Title = book.Title,
            Volumes = volumes.Select(v => new VolumeItemDto
            {
                Id = v.Id,
                BookId = v.BookId,
                Title = v.Title,
                Sort = v.Sort,
                CreatedAt = v.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
            }).ToList(),

            List = chapters
                .OrderBy(c => c.ChapterNum)
                .Select(c => new ChapterItemDto
                {
                    Id = c.Id,
                    VolumeId = c.VolumeId,
                    ChapterNum = c.ChapterNum,
                    Title = c.Title,
                    WordCount = c.WordCount ?? c.Content.Length,
                    UpdatedAt = c.UpdatedAt.ToString("yyyy-MM-dd HH:mm"),
                    Status = c.Status,
                    StatusText = c.Status,
                    TypoCount = 0
                }).ToList(),
        };
    }

    // 14. 删除章节
    public void DeleteChapter(int chapterId)
    {
        var chapter = this.repository.GetChapter(chapterId)
            ?? throw new BusinessException(40004, "章节不存在");

        this.repository.RemoveChapter(chapter);
        this.repository.SaveChanges();
    }

    // 15. 更新章节
    public void UpdateChapter(ChapterUpdateRequestDto request)
    {
        var chapter = this.repository.GetChapter(request.ChapterId)
            ?? throw new BusinessException(40004, "章节不存在");

        chapter.ChapterNum = request.ChapterNum;
        chapter.Title = request.Title;
        chapter.Content = request.Content;
        chapter.WordCount = request.WordCount;
        chapter.UpdatedAt = DateTime.UtcNow;

        this.repository.SaveChanges();
    }

    // 16. 章节详情
    public ChapterDetailResponseDto GetChapterDetail(int bookId, int chapterId)
    {
        var chapter = this.repository.GetChapter(chapterId)
            ?? throw new BusinessException(40004, "章节不存在");

        return new ChapterDetailResponseDto
        {
            VolumeIndex = chapter.Volume.Sort,
            VolumeTitle = chapter.Volume.Title,
            ChapterNum = chapter.ChapterNum,
            Title = chapter.Title,
            Content = chapter.Content,
        };
    }

    // 17. 删除分卷
    public void DeleteVolume(int bookId, int volumeId)
    {
        var volume = this.repository.GetVolume(volumeId)
            ?? throw new BusinessException(40004, "分卷不存在");

        this.repository.RemoveVolume(volume);
        this.repository.SaveChanges();
    }

    // 18. 更新分卷
    public void UpdateVolume(int volumeId, int bookId, string title)
    {
        var volume = this.repository.GetVolume(volumeId)
            ?? throw new BusinessException(40004, "分卷不存在");

        volume.Title = title;
        this.repository.SaveChanges();
    }

    // 19. 创建分卷
    public void CreateVolume(int bookId, string title, int sort)
    {
        var volume = new Volume
        {
            BookId = bookId,
            Title = title,
            Sort = sort,
            CreatedAt = DateTime.UtcNow,
        };

        this.repository.AddVolume(volume);
        this.repository.SaveChanges();
    }

    // 20. 最后章节（按书）
    public LastChapterResponseDto GetLastChapterByBook(int bookId)
    {
        var volume = this.repository.GetLastVolume(bookId);
        if (volume == null)
        {
            return new LastChapterResponseDto();
        }

        var chapter = this.repository.GetLastChapterByVolume(volume.Id);

        return new LastChapterResponseDto
        {
            LastVolumeId = volume.Sort,
            LastVolumeTitle = volume.Title,
            ChapterIndex = chapter?.ChapterNum ?? 0,
            ChapterTitle = chapter?.Title ?? string.Empty,
            UpdatedAt = chapter?.UpdatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
        };
    }

    // 21. 最后章节（按卷）
    public LastChapterResponseDto GetLastChapterByVolume(int bookId, int volumeId)
    {
        var current = this.repository.GetVolume(volumeId)
            ?? throw new BusinessException(40004, "分卷不存在");

        var lastVolume = this.repository.GetLastVolume(bookId)
            ?? throw new BusinessException(40004, "书籍不存在");

        var lastChapter = this.repository.GetLastChapterByVolume(lastVolume.Id);

        return new LastChapterResponseDto
        {
            VolumeTitle = current.Title,
            CurrentVolumeId = current.Sort,
            LastVolumeId = lastVolume.Sort,
            LastVolumeTitle = lastVolume.Title,
            ChapterIndex = lastChapter?.ChapterNum ?? 0,
            ChapterTitle = lastChapter?.Title ?? string.Empty,
            UpdatedAt = lastChapter?.UpdatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
        };
    }

    // 22. 最新章节
    public LatestChapterResponseDto GetLatestChapter(int bookId)
    {
        var chapter = this.repository.GetLatestChapterByBook(bookId);
        if (chapter == null)
        {
            return new LatestChapterResponseDto();
        }

        return new LatestChapterResponseDto
        {
            LatestVolumeSort = chapter.Volume.Sort,
            LatestChapterNum = chapter.ChapterNum,
            LatestChapterTitle = chapter.Title,
            LatestChapterUpdatedAt = chapter.UpdatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
        };
    }

    public MessagesResponseDto GetUserMessages(GetUserMessagesRequestDto request)
    {
        var totalCount = this.repository.CountMessages(
            request.UserId,
            request.Type);

        var messages = this.repository.GetMessages(
            request.UserId,
            request.Type,
            request.Page,
            request.PageSize);

        var items = messages.Select(m => new MessageItemDto
        {
            Id = m.Id,
            Category = m.Type,
            Title = m.Title ?? string.Empty,
            Content = m.Content,
            IsRead = m.IsRead,
            Time = m.CreatedAt.ToString("MM-dd"),
        }).ToList();

        return new MessagesResponseDto
        {
            Items = items,
            TotalCount = totalCount,
        };
    }

    public void MarkMessagesAsRead(MarkMessagesAsReadRequestDto request)
    {
        if (request.MessageIds == null || request.MessageIds.Count == 0)
        {
            return;
        }

        this.repository.MarkMessagesAsRead(request.MessageIds);
    }
}
