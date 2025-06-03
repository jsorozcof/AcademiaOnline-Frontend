export interface MateriasResponse {
  id: number;
  nombre: string;
  profesorNombre: string;
}


export interface MateriaProfesor {
  id: number;
  profesorId: number;
  profesorNombre: string;
  nombreMateria: string;
}
