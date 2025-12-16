namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.Writer.Requests;
using TomatoNovel.Application.DTOs.Writer.Responses;

public interface IWriterService
{
    List<object> GetNewsList(WriterNewsQueryRequestDto request);

    List<WriterClassroomResponseDto> GetClassroomList(
        WriterClassroomQueryRequestDto request);
}
