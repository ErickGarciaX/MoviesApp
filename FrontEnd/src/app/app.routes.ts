import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/MainPage/MainPage.component';
import { MoviesComponent } from './pages/Movie/Movie.component';
import { DirectorComponent } from './pages/Director/Director.component';
import { MovieFormComponent } from './pages/Movie/MovieForm/movie-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainPageComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'movies/new', component: MovieFormComponent },
    { path: 'directors', component: DirectorComponent },
    {
  path: 'movies/edit/:id',
  loadComponent: () => import('./pages/Movie/MovieForm/movie-form.component')
    .then(m => m.MovieFormComponent)
}

];
