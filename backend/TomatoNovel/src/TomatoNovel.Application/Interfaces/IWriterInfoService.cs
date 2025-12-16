namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.WriterInfo.Responses;

public interface IWriterInfoService
{
    WriterHeaderResponseDto GetWriterHeader(int writerId);

    WriterWorksResponseDto GetWriterWorks(int writerId);
}
