export interface EstudianteRequest {
  codigo: string;
  nombre: string;
  email: string;
  programaCreditos: number;
  materiasSeleccionadas: number[]; // IDs de materias (hasta 3)
}
