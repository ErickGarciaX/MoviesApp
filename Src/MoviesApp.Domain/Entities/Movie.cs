using System;
using System.Collections.Generic;
using System.Text;

namespace MoviesApp.Domain.Entities
{
    public class Movie
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Genre { get; set; } = string.Empty;  
        
        public int Year { get; set; }

    }
}
