export interface userDetails {
  email: string;
  password: string;
  name: string;
}

export interface User {
  name: string;
  email: string;
  iat?: number;
  id: string;
}
