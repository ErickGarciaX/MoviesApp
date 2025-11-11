import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { DirectorService } from '../../services/director.service';
import { Movie } from '../../models/movie';
import { ChangeDetectorRef } from '@angular/core';
import { Director } from '../../models/director';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Movie.component.html',
  styleUrls: ['./Movie.component.css']
})


export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  directors: Director[] = [];

  constructor(private movieService: MovieService, private router: Router, private cdr: ChangeDetectorRef, private directorService: DirectorService) {}

  

  ngOnInit(): void {
    this.loadMovies();
    this.loadDirectors();
  }

  loadDirectors(): void {
    this.directorService.getAllDirectors().subscribe({
      next: (data) => {
        this.directors = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar directores:', err)
    });
  }

  getDirectorName(id: number): string {
    const director = this.directors.find(d => d.id === id);
    return director ? director.name : 'Desconocido';
  }

  createMovie(): void {
  this.router.navigate(['/movies/new']);
}

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (data) => {
      this.movies = data;
      this.cdr.detectChanges(); 
    },
    error: (err) => console.error('Error al cargar películas:', err)
    });
  }

  editMovie(id: number) {
  this.router.navigate(['/movies/edit', id]);
}

  deleteMovie(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta película?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          this.movies = this.movies.filter(m => m.id !== id);
          alert('Película eliminada correctamente');
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al eliminar película:', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/main']);
  }
}