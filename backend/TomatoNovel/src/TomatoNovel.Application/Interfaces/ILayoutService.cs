namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.Layout.Requests;
using TomatoNovel.Application.DTOs.Layout.Responses;

public interface ILayoutService
{
    UserProfileUpdateResponseDto UpdateUserProfile(
        long Id,
        string name,
        string introduction,
        Stream? avatarStream
    );


    SearchBookResponseDto SearchBooks(SearchBookRequestDto request);
}
