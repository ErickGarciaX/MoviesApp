import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Director.component.html',
  styleUrls: ['./Director.component.css']
})

export class DirectorComponent {
    constructor(private router: Router) {}

}
