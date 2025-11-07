using System;
using System.Collections.Generic;
using System.Text;

namespace MoviesApp.Domain.Entities
{
    internal class Director
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }

        public bool IsActive { get; set; }  
    }
}
