using MoviesApp.Domain.Entities;

namespace MoviesApp.Application.Interfaces
{
    public interface IMovieService
    {
        Task CreateAsync(Movie movie);

        Task<Movie?> GetByIdAsync(int id);

        Task<List<Movie>> GetByDirectorIdAsync(int id);

        Task<List<Movie>> GetAllAsync();

        Task UpdateAsync(Movie movie);  

        Task DeleteAsync(int id);
    }
}
