import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onSubmit(): void {
  if (this.movieForm.valid) {
    console.log('Datos del formulario:', this.movieForm.value); // 👈 debug

    this.movieService.createMovie(this.movieForm.value).subscribe({
      next: () => {
        alert('🎬 Película creada exitosamente');
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error al crear película:', err);
        alert('⚠️ Error al guardar la película, revisa la consola');
      }
    });
  } else {
    alert('Por favor, completa todos los campos correctamente');
  }
}


  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
