import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EstudianteRequest } from '../models/estudiante-request.model';
import { EstudianteProgramaResponse, EstudianteResponse } from '../models/estudiante-response.model';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SeleccionMateriasRequest } from '../../materias/models/seleccion-materias-request';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/estudiantes`;

  getAll(): Observable<EstudianteProgramaResponse[]> {
    return this.http.get<EstudianteProgramaResponse[]>(this.baseUrl + '/ObtenerEstudiantes').pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<EstudianteResponse> {
    return this.http.get<EstudianteResponse>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

create(estudiante: EstudianteRequest): Observable<boolean> {
  return this.http.post<boolean>(this.baseUrl, estudiante).pipe(
    catchError((err) => {
      console.error('Error al crear el estudiante', err);
      return of(false);
    })
  );
}

guardarMateriasSeleccionadas(request: SeleccionMateriasRequest): Observable<boolean> {
  console.info("request", request);
  return this.http.post<boolean>(`${environment.apiBaseUrl}/Estudiantes/SaveSelectedSubjects`, request);
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
