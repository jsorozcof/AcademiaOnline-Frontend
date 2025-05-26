import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProgramasResponse } from '../models/programas-response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/ProgramaCredito`;

  getAll(): Observable<ProgramasResponse[]> {
    return this.http.get<ProgramasResponse[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<ProgramasResponse> {
    return this.http.get<ProgramasResponse>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('Error en EstudianteService:', error);
    const userMessage = error.error?.message || 'Error inesperado. Intenta nuevamente más tarde.';
    return throwError(() => new Error(userMessage));
  }
}
