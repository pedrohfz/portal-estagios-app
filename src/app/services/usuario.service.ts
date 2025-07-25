import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioRequestDTO {
  nome: string;
  email: string;
  senha?: string;
}

export interface UsuarioResponseDTO {
  id: number;
  nome: string;
  email: string;
}

export interface DashboardStats {
  totalEmpresas: number;
  totalEstudantes: number;
  totalVagasAbertas: number;
  totalVagasEncerradas: number;
}

export interface VagasPorArea {
  areaNome: string;
  quantidade: number;
}

export interface DashboardData {
  stats: DashboardStats;
  vagasPorArea: VagasPorArea[];
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/portalestagios/api/usuario';

  constructor(private http: HttpClient) {}

  listar(): Observable<UsuarioResponseDTO[]> {
    return this.http.get<UsuarioResponseDTO[]>(`${this.apiUrl}/listar`, { withCredentials: true });
  }

  obter(id: number): Observable<UsuarioResponseDTO> {
    return this.http.get<UsuarioResponseDTO>(`${this.apiUrl}/obter/${id}`, { withCredentials: true });
  }

  salvar(usuario: UsuarioRequestDTO): Observable<UsuarioResponseDTO> {
    console.log("entrou no salvar do service");
    
    return this.http.post<UsuarioResponseDTO>(`${this.apiUrl}/salvar`, usuario, { withCredentials: true });
  }

  atualizar(id: number, usuario: UsuarioRequestDTO): Observable<UsuarioResponseDTO> {
    return this.http.put<UsuarioResponseDTO>(`${this.apiUrl}/alterar/${id}`, usuario, { withCredentials: true });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`, { withCredentials: true });
  }

  getDashboardData(): Observable<DashboardData> {    
    return this.http.get<DashboardData>(`${this.apiUrl}/dashboard`, { withCredentials: true });
  }
}
