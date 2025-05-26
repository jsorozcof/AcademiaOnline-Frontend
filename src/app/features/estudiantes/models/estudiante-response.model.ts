
export interface EstudianteProgramaResponse {
  id: number;
  codigo: string;
  nombre: string;
  email: string;
  programa_creditos: number;
  programa_Id: number,
  nombrePrograma: string
}


export interface EstudianteResponse {
  id: number;
  codigo: string;
  nombre: string;
  email: string;
  programaCreditos: number;
  materias: MateriaAsignada[];
}

export interface MateriaAsignada {
  id: number;
  nombre: string;
  profesorNombre: string;
}
