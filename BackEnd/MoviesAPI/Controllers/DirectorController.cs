using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApp.Application.Interfaces;
using MoviesApp.Domain.Entities;

namespace MoviesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorController : ControllerBase
    {
        private readonly IDirectorService _directorService;

        public DirectorController(IDirectorService directorService)
        {
            _directorService = directorService;
        }

        [HttpGet]

        public async Task<IActionResult> GetAllDirectors()
        {
            var directors = await _directorService.GetAllAsync();
            return Ok(directors);
        }

        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetById(int id)
        {
            var director = await _directorService.GetById(id);
            if (director == null)
            {
                return NotFound();
            }   
            return Ok(director);
        }

        [HttpPost]

        public async Task<IActionResult> CreateDirector([FromBody] Director director)
        {
            await _directorService.CreateAsync(director);
            return CreatedAtAction(nameof(GetById), new { id = director.Id }, director);
        }

        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateDirector(int id, [FromBody] Director director)
        {
            if (id != director.Id)          
                return BadRequest();
            
            await _directorService.UpdateAsync(director);
            return NoContent();

        }

        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteDirector(int id)
        {
            await _directorService.DeleteAsync(id);
            return NoContent();
        }
    }
}
