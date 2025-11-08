using MoviesApp.Domain.Entities;

namespace MoviesApp.Application.Interfaces
{
    public interface IDirectorService
    {
        Task CreateAsync(Director director);

        Task<Director?> GetById(int id);

        Task<List<Director>> GetAllAsync();

        Task UpdateAsync (Director director);   

        Task DeleteAsync(int id);

    }
}
