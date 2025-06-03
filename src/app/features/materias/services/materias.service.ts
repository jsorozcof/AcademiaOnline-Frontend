import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MateriaProfesor, MateriasResponse } from '../models/materia-response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/Materias`;

  getAll(): Observable<MateriasResponse[]> {
    return this.http.get<MateriasResponse[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getSubjectsWithProfessors(): Observable<MateriaProfesor[]> {
    return this.http.get<MateriaProfesor[]>(`${environment.apiBaseUrl}/Materias/GetSubjectsWithProfessors`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<MateriasResponse> {
    return this.http.get<MateriasResponse>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    console.error('Error en MateriasService:', error);
    const userMessage = error.error?.message || 'Error inesperado. Intenta nuevamente más tarde.';
    return throwError(() => new Error(userMessage));
  }
}
