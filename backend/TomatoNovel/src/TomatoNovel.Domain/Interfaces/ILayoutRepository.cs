namespace TomatoNovel.Domain.Interfaces;

using TomatoNovel.Domain.Entities;

/// <summary>
/// Repository for layout related read/write operations.
/// </summary>
public interface ILayoutRepository
{
    /// <summary>
    /// Get user by primary key.
    /// </summary>
    /// <returns></returns>
    User GetUserById(long userId);

    /// <summary>
    /// Update user profile with avatar.
    /// Repository is responsible for:
    /// 1. Saving avatar file to /wwwroot/uploads/user/avatars/
    /// 2. Updating user avatar path in database.
    /// </summary>
    void UpdateUser(
        User user,
        Stream avatarStream,
        string avatarUuid);

    /// <summary>
    /// Count books with filter conditions.
    /// </summary>
    /// <returns></returns>
    int CountBooks(
        string? keyword,
        int stateIndex,
        int numIndex,
        int timeIndex);

    /// <summary>
    /// Search books and return flattened raw data.
    /// Repository must NOT use any DTO.
    /// </summary>
    /// <returns></returns>
    List<(
        int BookId,
        string Title,
        string Author,
        string Status,
        int WordCount,
        string Intro,
        DateTime UpdatedAt,
        string CoverUrl,
        int FavoriteCount,
        string? LatestChapterTitle,
        int? FirstVolumeSort,
        int? FirstChapterNum,
        int? LatestVolumeSort,
        int? LatestChapterNum)> SearchBooks(
        string? keyword,
        int stateIndex,
        int numIndex,
        int timeIndex,
        int type,
        int page,
        int pageSize);
}
