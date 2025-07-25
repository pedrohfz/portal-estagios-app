import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmpresaRequestDTO {
  nome: string;
  cnpj: string;
  email: string;
  senha?: string;
  telefone: string;
  endereco?: string;
  idsAreasAtuacao?: number[]; 
}

export interface AreaInteresseResponseDTO {
  id: number;
  nome: string;
}

export interface EmpresaResponseDTO {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco?: string;
  areasAtuacao: AreaInteresseResponseDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/portalestagios/api/empresa';

  constructor(private http: HttpClient) {}

  listar(): Observable<EmpresaResponseDTO[]> {
    return this.http.get<EmpresaResponseDTO[]>(`${this.apiUrl}/listar`, { withCredentials: true });
  }

  obter(id: number): Observable<EmpresaResponseDTO> {
    return this.http.get<EmpresaResponseDTO>(`${this.apiUrl}/obter/${id}`, { withCredentials: true });
  }

  salvar(empresa: EmpresaRequestDTO): Observable<EmpresaResponseDTO> {
    return this.http.post<EmpresaResponseDTO>(`${this.apiUrl}/salvar`, empresa, { withCredentials: true });
  }

  atualizar(id: number, empresa: EmpresaRequestDTO): Observable<EmpresaResponseDTO> {
    return this.http.put<EmpresaResponseDTO>(`${this.apiUrl}/alterar/${id}`, empresa, { withCredentials: true });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`, { withCredentials: true });
  }
}
