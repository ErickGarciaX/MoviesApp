using MoviesApp.Domain.Entities;  
using Microsoft.EntityFrameworkCore;

namespace MoviesApp.Infraestructure.Context
{
    public class MoviesDbContext : DbContext
    {
        
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; } = null!;
        public DbSet<Director> Directors { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Movie

            modelBuilder.Entity<Movie>()
                .ToTable("Movies")
                .HasKey(m => m.Id);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Id)
                .HasColumnName("MovieId")
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Movie>()
                .Property(m => m.Title)
                .HasColumnName("Name")
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Genre)
                .HasColumnName("Genre")
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Duration)
                .HasColumnName("Duration")
                .IsRequired();

            modelBuilder.Entity<Movie>()
                .Property(m => m.IdDirector)
                .HasColumnName("FKDirector");

            modelBuilder.Entity<Movie>()
                .HasOne<Director>()
                .WithMany()
                .HasForeignKey(m => m.IdDirector)
                .OnDelete(DeleteBehavior.Cascade);


            #endregion

            #region Director

            modelBuilder.Entity<Director>()
                .ToTable("Director")
                .HasKey(l => l.Id);

            modelBuilder.Entity<Director>()
                .Property(l => l.Id)
                .HasColumnName("DirectorId")
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Director>()
                .Property(l => l.Name)
                .HasColumnName("Name")
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Director>()
                .Property(l => l.Age)
                .HasColumnName("Age")
                .IsRequired();

            modelBuilder.Entity<Director>()
                .Property(l => l.IsActive)
                .HasColumnName("Active")
                .IsRequired();


            #endregion
        }
    }


}
