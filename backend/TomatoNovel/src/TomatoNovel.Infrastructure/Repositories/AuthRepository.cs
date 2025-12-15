namespace TomatoNovel.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

public class AuthRepository : IAuthRepository
{
    private readonly TomatoNovelDbContext db;

    public AuthRepository(TomatoNovelDbContext db)
    {
        this.db = db;
    }

    public async Task<User?> GetUserByPhoneAsync(string phone)
    {
        return await this.db.Users.FirstOrDefaultAsync(u => u.Phone == phone);
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
            Avatar = avatar,
        };

        this.db.Users.Add(user);
        await this.db.SaveChangesAsync();

        return user;
    }
}
