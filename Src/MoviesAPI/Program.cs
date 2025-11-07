using Microsoft.AspNetCore.Mvc;
using MoviesApp.Application.Interfaces;
using MoviesApp.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.MapGet("/Director/list", async (IDirectorService service) =>
{
    List<Director> directors = await service.GetAllAsync();

    return Results.Ok(directors);
});

app.MapPost("/Director", async (IDirectorService service, [FromBody] Director director) =>
{
    await service.CreateAsync(director);

    return Results.Ok();
});

/*app.MapPost("/Director/list", async (IDirectorService service, [FromBody] Director director) =>
{
    await service.UpdateAsync(director);

    return Results.Ok();
});*/

app.Run();

