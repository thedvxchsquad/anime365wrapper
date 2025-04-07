export interface User {
    isLogined: boolean;
    id: number;
    name: string;
    isPremium: boolean;
    premiumUntil: string;
  }
  
  export interface LoginResponse {
    access_token: string;
  }
  