import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectorService } from '../../../services/director.service';
import { Director } from '../../../models/director';


@Component({
  selector: 'app-director-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './director-form.component.html',
  styleUrls: ['./director-form.component.css']
})





export class DirectorFormComponent implements OnInit {
    directorForm: FormGroup;
    directors: Director[] = [];
      isEditMode = false;
      directorId!: number;
    
      constructor(
        private fb: FormBuilder,
        private directorService: DirectorService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
      ) {
        this.directorForm = this.fb.group({
          name: ['', Validators.required],
          age: ['', [Validators.required, Validators.min(18)]],
          isActive: ['', Validators.required]
        });
      }

    ngOnInit(): void {
    this.directorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.directorId) {
      this.isEditMode = true;
      this.loadDirectorData();
    }
    }


    loadDirectorData(): void {
    this.directorService.getDirectorById(this.directorId).subscribe({
      next: (director) => {
        this.directorForm.patchValue({
            name: director.name,
            age: director.age,
            isActive: director.isActive
        });
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar director:', err),
    });
  }

  onSubmit(): void {
    if (this.directorForm.invalid) {
      alert('Por favor, completa todos los campos correctamente');
      return;
    }

    const directorData: Omit<Director, 'id'> = {
        name: this.directorForm.value.name,
        age: this.directorForm.value.age,
        isActive: this.directorForm.value.isActive
    };

    console.log('Datos del director a enviar:', directorData);

    if (this.isEditMode) {
      this.directorService.updateDirector(this.directorId, { id: this.directorId, ...directorData }).subscribe({
        next: () => {
          alert('Director actualizado correctamente');
          this.router.navigate(['/directors']);
        },
        error: (err) => console.error('Error al actualizar director:', err),
      });
    } else {
      this.directorService.createDirector(directorData).subscribe({
        next: () => {
          alert('Director creado exitosamente');
          this.router.navigate(['/directors']);
        },
        error: (err) => console.error('Error al crear director:', err),
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/directors']);
  }
}
    

