import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorService } from '../../services/director.service';
import { Director } from '../../models/director';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-director',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  directors: Director[] = [];

  constructor(private directorService: DirectorService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
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

  createDirector(): void {
    this.router.navigate(['/directors/new']);
  }

  editDirector(id: number): void {
    this.router.navigate([`/directors/edit/${id}`]);
  }

  deleteDirector(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este director?')) {
      this.directorService.deleteDirector(id).subscribe({
        next: () => {
          alert('Director eliminado');
          this.loadDirectors();
          
        },
        error: (err) => console.error('Error al eliminar director:', err),
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/main']);
  }
}
