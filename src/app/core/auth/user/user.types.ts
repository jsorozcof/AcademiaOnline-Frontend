export interface User {
    id: string;
    name: string;
    email: string;
}

export interface UserSessionData {
  userId: string;
  companyId: number;
  merchantId: string
}
