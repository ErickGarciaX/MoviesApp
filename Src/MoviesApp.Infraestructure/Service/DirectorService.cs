using MoviesApp.Application.Interfaces;
using MoviesApp.Domain.Entities;
using MoviesApp.Infraestructure.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoviesApp.Infraestructure.Service
{
    public class DirectorService : IDirectorService
    {
        private readonly MoviesDbContext _context;

        public DirectorService(MoviesDbContext context) 
        { 
            _context = context;
        }
        public async Task CreateAsync(Director director)
        {
            await _context.Directors.AddAsync(director);

            await _context.SaveChangesAsync();
        }

        public Task<Director?> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Director>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Director director)
        {
            throw new NotImplementedException();    
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

    }
}
