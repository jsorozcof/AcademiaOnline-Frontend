export interface AuthUserResponse {
    nombreCompleto: string;
    userId:         string;
    estudianteId:   number;
    userName:       string;
    email:          string;
    accessToken:    string;
    isSuccess:      boolean;
  }

  export interface InfoUser {
    value: User
    status: number
    isSuccess: boolean
    successMessage: string
    correlationId: string
    errors: any[]
    validationErrors: any[]
  }

  export interface User {
    userId: string
    companyId: number,
    merchantId: string,
    rolId: string
    Id: string
    name: string
    email: string
    roles: any[]
    id: string;
    avatar?: string;
    status?: string;
    accessToken: string
  }
