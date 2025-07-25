import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/portalestagios'; 

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post(`${this.baseUrl}/api/auth/login`, { email, senha }, { withCredentials: true });
  }

  salvarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('usuario')) {
      return JSON.parse(localStorage.getItem('usuario')!);
    }
    return null;
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  tipoUsuario(): string {
    return this.getUsuario()?.tipo || '';
  }

  estaLogado(): boolean {
    return !!this.getUsuario();
  }
}
