
using Microsoft.EntityFrameworkCore;
using MoviesApp.Application.Interfaces;
using MoviesApp.Infraestructure.Context;
using MoviesApp.Infraestructure.Service;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<MoviesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Inject services >:D
builder.Services.AddScoped<IDirectorService, DirectorService>();
builder.Services.AddScoped<IMovieService, MovieService>();


builder.Services.AddControllers();


var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();

