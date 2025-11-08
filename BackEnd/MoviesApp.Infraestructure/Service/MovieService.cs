using Microsoft.EntityFrameworkCore;
using MoviesApp.Application.Interfaces;
using MoviesApp.Domain.Entities;
using MoviesApp.Infraestructure.Context;


namespace MoviesApp.Infraestructure.Service
{
    public class MovieService : IMovieService
    {
        private readonly MoviesDbContext _context;

        public MovieService(MoviesDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Movie movie)
        {
            await _context.Movies.AddAsync(movie);  

            await _context.SaveChangesAsync();
           
        }

        public async Task<Movie?> GetByIdAsync(int id)
        {
            return await _context.Movies
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<Movie>> GetByDirectorIdAsync(int id)
        {
            return await _context.Movies
                .Where(m => m.IdDirector == id)
                .AsNoTracking()
                .ToListAsync();

        }

        public async Task<List<Movie>> GetAllAsync()
        {
            return await _context.Movies
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task UpdateAsync(Movie movie)
        {
            var existingMovie = await _context.Movies.FindAsync(movie.Id) ?? throw new Exception("Movie with ID: {movie.Id} not founded.");

            existingMovie.Title = movie.Title;
            existingMovie.Genre = movie.Genre;
            existingMovie.Duration = movie.Duration;
            existingMovie.IdDirector = movie.IdDirector;

            _context.Movies.Update(existingMovie);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var movie = await _context.Movies.FindAsync(id) ?? throw new Exception("Movie with ID: {id} not founded.");

            _context.Movies.Remove(movie);

            await _context.SaveChangesAsync();
        }


    }
}
