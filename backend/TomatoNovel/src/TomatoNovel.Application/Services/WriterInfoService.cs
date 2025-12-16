namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.WriterInfo.Responses;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Interfaces;

public class WriterInfoService : IWriterInfoService
{
    private readonly IWriterInfoRepository writerInfoRepository;

    public WriterInfoService(IWriterInfoRepository writerInfoRepository)
    {
        this.writerInfoRepository = writerInfoRepository;
    }

    public WriterHeaderResponseDto GetWriterHeader(int writerId)
    {
        var author = this.writerInfoRepository.GetAuthorById(writerId);
        if (author == null)
        {
            throw new Exception("作者不存在");
        }

        var totalWords = this.writerInfoRepository.GetTotalBookWordCount(writerId);

        return new WriterHeaderResponseDto
        {
            Writer = new WriterDto
            {
                Nickname = author.Nickname ?? string.Empty,
                AvatarUrl = author.Avatar ?? string.Empty,
                Signature = author.Signature ?? string.Empty,
                Intro = author.Signature ?? string.Empty,
                BecomeAuthorAt = author.BecomeAuthorAt?.ToString("O") ?? string.Empty,
                TotalWords = totalWords,
                FollowerCount = 0 // 预留：后续从 Follow 表统计
            }
        };
    }

    public WriterWorksResponseDto GetWriterWorks(int writerId)
    {
        var books = this.writerInfoRepository.GetBooksByAuthorId(writerId);

        var works = books.Select(book =>
        {
            var maxChapterNum = this.writerInfoRepository.GetMaxChapterNum(book.Id);
            var maxChapterTitle =
                this.writerInfoRepository.GetMaxChapterTitle(book.Id, maxChapterNum);

            var totalWordCount =
                this.writerInfoRepository.GetTotalChapterWordCount(book.Id);

            return new WriterWorkDto
            {
                Title = book.Title,
                CoverUrl = book.CoverUrl ?? string.Empty,
                Status = book.Status ?? string.Empty,
                WordCount = totalWordCount,
                Tags = book.Tags ?? string.Empty,
                Intro = book.Intro ?? string.Empty,
                UpdatedAt = book.UpdatedAt.ToString("O"),
                BookinfoPath = $"/bookinfo/{book.Id}",
                MaxChapter = maxChapterNum,
                MaxChapterTitle = maxChapterTitle
            };
        }).ToList();

        return new WriterWorksResponseDto
        {
            Works = works
        };
    }
}
