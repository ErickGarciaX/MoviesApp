using MoviesApp.Application.Interfaces;
using MoviesApp.Domain.Entities;
using MoviesApp.Infraestructure.Context;
using System;
using System.Collections.Generic;
using System.Text;

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
            throw new NotImplementedException();
        }

        public async Task<List<Movie>> GetByDirectorIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Movie movie)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }


    }
}
