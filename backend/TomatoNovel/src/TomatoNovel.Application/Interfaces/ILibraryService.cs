namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.Library.Requests;
using TomatoNovel.Application.DTOs.Library.Responses;

public interface ILibraryService
{
    BookListResponseDto GetBooks(BookListQueryRequestDto request);
}
