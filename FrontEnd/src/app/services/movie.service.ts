import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class MovieService {

    private apiUrl = `${environment.apiUrl}/movie`;

    constructor(private http: HttpClient) { }
    
    getAllMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiUrl);
    }

    getMovieById(id: number): Observable<Movie> {
        return this.http.get<Movie>(`${this.apiUrl}/${id}`);
    }

    createMovie(movie: Omit<Movie, 'id'>): Observable<Movie> {
        return this.http.post<Movie>(this.apiUrl, movie);
    }

    updateMovie(id: number, movie: Movie): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, movie);
    }

    deleteMovie(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}