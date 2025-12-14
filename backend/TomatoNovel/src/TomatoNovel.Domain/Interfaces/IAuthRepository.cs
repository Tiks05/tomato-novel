namespace TomatoNovel.Domain.Interfaces;

using TomatoNovel.Domain.Entities;

public interface IAuthRepository
{
    Task<User?> GetUserByPhoneAsync(string phone);

    Task<User> CreateUserAsync(string phone, string passwordHash, string nickname, string avatar);
}
