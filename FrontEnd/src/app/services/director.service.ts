import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/director';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'

})

export class DirectorService {

    private apiUrl = `${environment.apiUrl}/director`;


    constructor(private http: HttpClient) { }

    getAllDirectors(): Observable<Director[]> {
        return this.http.get<Director[]>(this.apiUrl);
    }

    getDirectorById(id: number): Observable<Director> {
        return this.http.get<Director>(`${this.apiUrl}/${id}`);
    }

    createDirector(director: Director): Observable<Director> {
        return this.http.post<Director>(this.apiUrl, director);
    }

    updateDirector(id: number, director: Director): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, director);
    }

    deleteDirector(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}