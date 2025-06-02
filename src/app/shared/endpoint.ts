import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
    // AUTH MODULE
    LOGIN: "/Usuario/login",
    REGISTER: "/Usuario/register",



  };

  export const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
