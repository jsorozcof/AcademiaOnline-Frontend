import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
    // AUTH MODULE
    LOGIN: "/Usuario/login",
    REGISTER: "/Usuario/register",

    PROGRAMA_CREDITOS: "/ProgramaCredito",
    ESTUDIANTE_ADHESION: "/Estudiantes/adhesion",
    OBTENER_PROGRAMA_ESTUDIANTE: "/Estudiantes/ObtenerProgramaEstudiante"

  };

  export const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
