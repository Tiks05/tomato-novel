namespace TomatoNovel.Domain.Interfaces;

/// <summary>
/// Provides data access operations for common public data
/// (e.g. banners, homepage configuration).
/// </summary>
public interface ICommonRepository
{
    /// <summary>
    /// Gets banner news records for homepage display.
    /// </summary>
    /// <param name="limit">Maximum number of records to retrieve.</param>
    /// <returns>
    /// List of (Id, BannerUrl) tuples.
    /// </returns>
    List<(int Id, string? BannerUrl)> GetBannerNews(int limit);

    // Adapt
    List<(int Id, string? CoverUrl)>
        GetAdaptBooks(int? limit);
}
