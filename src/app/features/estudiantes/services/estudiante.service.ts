import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EstudianteRequest } from '../models/estudiante-request.model';
import { EstudianteResponse } from '../models/estudiante-response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/estudiantes`;

  getAll(): Observable<EstudianteResponse[]> {
    return this.http.get<EstudianteResponse[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<EstudianteResponse> {
    return this.http.get<EstudianteResponse>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(estudiante: EstudianteRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, estudiante).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, estudiante: EstudianteRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, estudiante).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCompañerosPorMateria(estudianteId: number, materiaId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${estudianteId}/companeros/${materiaId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en EstudianteService:', error);
    const userMessage = error.error?.message || 'Error inesperado. Intenta nuevamente más tarde.';
    return throwError(() => new Error(userMessage));
  }
}
