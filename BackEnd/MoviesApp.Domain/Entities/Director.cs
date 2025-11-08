
namespace MoviesApp.Domain.Entities
{
    public class Director
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }

        public bool IsActive { get; set; }  
    }
}
