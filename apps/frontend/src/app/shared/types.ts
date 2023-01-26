export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type GraphQlResponse<T> = {
  data: T;
};
