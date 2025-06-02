import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProgramasResponse } from '../models/programas-response.model';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { endpoint } from '../../../shared/endpoint';
import { AdherirEstudianteAProgramaRequest } from '../models/programas-request.model';
import { AdherirEstudianteProgramaResponse, ObtenerProgramaEstudianteResponse } from '../../estudiantes/models/adherir-estudiante-programa.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<ProgramasResponse[]> {
      const requestUrl = `${env.apiBaseUrl}${endpoint.PROGRAMA_CREDITOS}`;

    return this.http.get<ProgramasResponse[]>(requestUrl).pipe(
      catchError(this.handleError)
    );
  }

   getById(id: number): Observable<ProgramasResponse> {
    return this.http.get<ProgramasResponse>(`${env.apiBaseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

obtenerProgramaEstudiante(estudianteId: number): Observable<ObtenerProgramaEstudianteResponse> {
  return this.http.post<ObtenerProgramaEstudianteResponse>(
    `${env.apiBaseUrl}${endpoint.OBTENER_PROGRAMA_ESTUDIANTE}`,
    { estudianteId }
  ).pipe(
    catchError((err) => {
      console.error('Error al obtener el programa del estudiante', err);

      // Retornar un objeto válido en caso de error con programa como undefined
      return of({
        isSuccess: false,
        message: 'Hubo un error al obtener el programa del estudiante',
        programa: undefined // Corregido: `undefined` en lugar de `null`
      });
    })
  );
}

adherirprograma(adherirEstudiante: AdherirEstudianteAProgramaRequest): Observable<AdherirEstudianteProgramaResponse> {
  return this.http.post<AdherirEstudianteProgramaResponse>(
    `${env.apiBaseUrl}${endpoint.ESTUDIANTE_ADHESION}`,
    adherirEstudiante
  ).pipe(
    catchError((err) => {
      console.error('Error al crear el estudiante', err);

      // Retornar un objeto válido en caso de error
      return of({
        isSuccess: false,
        message: 'Hubo un error al adherir al estudiante al programa'
      } as unknown as AdherirEstudianteProgramaResponse);
    })
  );
}




  private handleError(error: HttpErrorResponse) {
    console.error('Error en EstudianteService:', error);
    const userMessage = error.error?.message || 'Error inesperado. Intenta nuevamente más tarde.';
    return throwError(() => new Error(userMessage));
  }
}
