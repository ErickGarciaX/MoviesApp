using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApp.Application.Interfaces;
using MoviesApp.Domain.Entities;
using MoviesApp.Infraestructure.Service;


namespace MoviesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _movieService.GetByIdAsync(id);
            if (movie == null)
                return NotFound($"Could't found movie with Id: {id}");

            return Ok(movie);
        }

        [HttpGet("director/{id:int}")]

        public async Task<IActionResult> GetByDirectorId(int id)
        {
            var movies = await _movieService.GetByDirectorIdAsync(id);

            if (movies == null || !movies.Any())
                return NotFound($"Could't found movies for director with Id: {id}");

            return Ok(movies);
        }

        [HttpGet]

        public async Task<IActionResult> GetAllMovies()
        {
            var movies = await _movieService.GetAllAsync();
            return Ok(movies);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] Movie movie)
        {
            await _movieService.CreateAsync(movie);
            return CreatedAtAction(nameof(GetById), new { id = movie.Id }, movie);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] Movie movie)
        {
            if (id != movie.Id)
                return BadRequest("The ID Couldn't be founded :c.");

            await _movieService.UpdateAsync(movie);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            await _movieService.DeleteAsync(id);
            return NoContent();
        }

    }
}
