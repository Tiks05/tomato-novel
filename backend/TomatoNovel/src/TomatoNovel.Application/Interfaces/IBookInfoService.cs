namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.BookInfo.Requests;
using TomatoNovel.Application.DTOs.BookInfo.Responses;

public interface IBookInfoService
{
    BookHeaderResponseDto GetBookHeader(int bookId);

    BookContentResponseDto GetBookContent(int bookId);

    ChapterReadResponseDto ReadChapter(ChapterReadRequestDto request);
}
