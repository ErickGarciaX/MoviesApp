using Microsoft.EntityFrameworkCore;
using MoviesApp.Application.Interfaces;
using MoviesApp.Domain.Entities;
using MoviesApp.Infraestructure.Context;


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

        public async Task<Director?> GetById(int id)
        {
            return await _context.Directors
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<List<Director>> GetAllAsync()
        {
            return await _context.Directors
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task UpdateAsync(Director director)
        {
            var existingDirector = await _context.Directors.FindAsync(director.Id) ?? throw new Exception("Director with ID: {director.Id} not founded.");

            existingDirector.Name = director.Name;
            existingDirector.Age = director.Age;
            existingDirector.IsActive = director.IsActive;

            _context.Directors.Update(existingDirector);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var director = await _context.Directors.FindAsync(id) ?? throw new Exception("Director with ID: {id} not founded.");

            _context.Directors.Remove(director);
            await _context.SaveChangesAsync();
        }

    }
}
