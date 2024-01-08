export interface Role {
  id: number;
  description: string;
}

export interface User {
  id: number;
  idRole: number;
  email: string;
  password: string;
  token: string;
  ban: boolean;
}

export interface Quote {
  quote: string;
}

export interface QuoteFavorite {
  id: number;
  idUser: number;
  description: string;
}
