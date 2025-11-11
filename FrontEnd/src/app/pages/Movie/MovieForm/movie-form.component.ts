import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { DirectorService } from '../../../services/director.service';
import { Director } from '../../../models/director';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})

export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  directors: Director[] = [];
  isEditMode = false;
  movieId!: number;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private directorService: DirectorService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern(/^\d{2}:\d{2}:\d{2}$/)]],
      directorId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDirectors();

    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.movieId) {
      this.isEditMode = true;
      this.loadMovieData();
    }
  }

  loadDirectors(): void {
    this.directorService.getAllDirectors().subscribe({
      next: (data) => {
        this.directors = data;
        console.log('Directores cargados:', data);
      },
      error: (err) => console.error('Error al cargar directores:', err)
    });
  }

loadMovieData(): void {
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movieForm.patchValue({
          title: movie.title,
          genre: movie.genre,
          duration: movie.duration,
          directorId: movie.idDirector
        });
      },
      error: (err) => console.error('Error al cargar película:', err)
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      alert('Por favor, completa todos los campos correctamente');
      return;
    }

    const movieData: Omit<Movie, 'id'> = {
      title: this.movieForm.value.title,
      genre: this.movieForm.value.genre,
      duration: this.movieForm.value.duration,
      idDirector: this.movieForm.value.directorId
    };

    if (this.isEditMode) {
      this.movieService.updateMovie(this.movieId, { id: this.movieId, ...movieData }).subscribe({
        next: () => {
          alert('✅ Película actualizada exitosamente');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error('Error al actualizar película:', err);
          alert('Error al actualizar la película, revisa la consola');
        }
      });
    } else {
      this.movieService.createMovie(movieData).subscribe({
        next: () => {
          alert('🎬 Película creada exitosamente');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error('Error al crear película:', err);
          alert('Error al guardar la película, revisa la consola');
        }
      });
    }
  }



  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
