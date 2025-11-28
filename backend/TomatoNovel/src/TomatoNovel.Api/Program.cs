// <copyright file="Program.cs" company="TomatoNovel">
// Copyright (c) TomatoNovel. All rights reserved.
// </copyright>

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// OpenAPI / API description (new .NET 9 style)
builder.Services.AddOpenApi();

// Configure EF Core DbContext (MySQL via Pomelo)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                       ?? throw new InvalidOperationException("Connection string 'DefaultConnection' was not found.");

builder.Services.AddDbContext<TomatoNovelDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Exposes /openapi/v1.json
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Map attribute-routed controllers (e.g. [ApiController] ones)
app.MapControllers();

app.Run();
