import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Movie.component.html',
  styleUrls: ['./Movie.component.css']
})


export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  

  ngOnInit(): void {
    this.loadMovies();
  }

  createMovie(): void {
  this.router.navigate(['/movies/new']);
}

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.error('Error al cargar películas:', err)
    });
  }

  editMovie(movie: Movie): void {
    alert(`✏️ Editar película: ${movie.title}`);
    // Aquí podrías redirigir a una vista de edición: this.router.navigate(['/movies/edit', movie.id]);
  }

  deleteMovie(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta película?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          this.movies = this.movies.filter(m => m.id !== id);
          alert('Película eliminada correctamente');
        },
        error: (err) => console.error('Error al eliminar película:', err)
      });
    }
  }
}