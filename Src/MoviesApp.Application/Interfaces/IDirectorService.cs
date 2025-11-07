using MoviesApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

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
