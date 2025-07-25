import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstudanteRequestDTO {
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  curso: string;
  idsAreasInteresse?: number[];
}

export interface AreaInteresseResponseDTO {
  id: number;
  nome: string;
}

export interface EstudanteResponseDTO {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  curso: string;
  areasInteresse: AreaInteresseResponseDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class EstudanteService {
  private apiUrl = 'http://localhost:8080/portalestagios/api/estudante';

  constructor(private http: HttpClient) {}

  listar(): Observable<EstudanteResponseDTO[]> {
    return this.http.get<EstudanteResponseDTO[]>(`${this.apiUrl}/listar`, { withCredentials: true });
  }

  obter(id: number): Observable<EstudanteResponseDTO> {
    return this.http.get<EstudanteResponseDTO>(`${this.apiUrl}/obter/${id}`, { withCredentials: true });
  }

  salvar(estudante: EstudanteRequestDTO): Observable<EstudanteResponseDTO> {
    return this.http.post<EstudanteResponseDTO>(`${this.apiUrl}/salvar`, estudante, { withCredentials: true });
  }

  atualizar(id: number, estudante: EstudanteRequestDTO): Observable<EstudanteResponseDTO> {
    return this.http.put<EstudanteResponseDTO>(`${this.apiUrl}/alterar/${id}`, estudante, { withCredentials: true });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`, { withCredentials: true });
  }
}
