import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.css']
})

export class MainPageComponent {
  
    constructor(private router: Router) {}

  goToMovies() {
    this.router.navigate(['/movies']);
  }

  goToDirectors() {
    this.router.navigate(['/directors']);
  }
}


