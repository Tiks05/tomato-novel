namespace TomatoNovel.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

public class AuthRepository : IAuthRepository
{
    private readonly TomatoNovelDbContext _db;

    public AuthRepository(TomatoNovelDbContext db)
    {
        _db = db;
    }

    public async Task<User?> GetUserByPhoneAsync(string phone)
    {
        return await _db.Users.FirstOrDefaultAsync(u => u.Phone == phone);
    }

    public async Task<User> CreateUserAsync(
        string phone,
        string passwordHash,
        string nickname,
        string avatar)
    {
        var user = new User
        {
            Phone = phone,
            PasswordHash = passwordHash,
            Role = "user",
            Nickname = nickname,
            Avatar = avatar
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return user;
    }
}
