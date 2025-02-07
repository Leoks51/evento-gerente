import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private userData = {
    email: 'admin',
    senha: 'admin',
  };

  private isAuthenticated = false;

  login(email: string, senha: string): boolean {
    if (email === this.userData.email && senha === this.userData.senha) {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}

