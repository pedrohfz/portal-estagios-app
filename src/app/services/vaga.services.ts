import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Modalidade {
  PRESENCIAL = 'PRESENCIAL',
  REMOTO = 'REMOTO',
  HIBRIDO = 'HIBRIDO'
}

export interface VagaRequestDTO {
  titulo: string;
  descricao: string;
  localizacao: string;
  modalidade: Modalidade;
  cargaHoraria: string;
  requisitos?: string;
  areaId: number;
}

export interface VagaResponseDTO {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  modalidade: Modalidade;
  cargaHoraria: string;
  requisitos?: string;
  empresaId: number;
  empresaNome?: string;
  areaId: number;
  areaNome?: string;
  situacao: String;
}

@Injectable({
  providedIn: 'root',
})
export class VagaService {
  private apiUrl = 'http://localhost:8080/portalestagios/api/vaga';

  constructor(private http: HttpClient) {}

  listar(): Observable<VagaResponseDTO[]> {
    return this.http.get<VagaResponseDTO[]>(`${this.apiUrl}/listar`, { withCredentials: true });
  }

  listarByEmpresa(): Observable<VagaResponseDTO[]> {
    return this.http.get<VagaResponseDTO[]>(`${this.apiUrl}/listar-empresa`, { withCredentials: true });
  }

  listarDisponiveis(): Observable<VagaResponseDTO[]> {
    return this.http.get<VagaResponseDTO[]>(`${this.apiUrl}/listar-disponiveis`, { withCredentials: true });
  }

  obter(id: number): Observable<VagaResponseDTO> {
    return this.http.get<VagaResponseDTO>(`${this.apiUrl}/obter/${id}`, { withCredentials: true });
  }

  salvar(vaga: VagaRequestDTO): Observable<VagaResponseDTO> {
    return this.http.post<VagaResponseDTO>(`${this.apiUrl}/salvar`, vaga, { withCredentials: true });
  }

  atualizar(id: number, vaga: VagaRequestDTO): Observable<VagaResponseDTO> {
    return this.http.put<VagaResponseDTO>(`${this.apiUrl}/alterar/${id}`, vaga, { withCredentials: true });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`, { withCredentials: true });
  }

  encerrar(id: number): Observable<VagaResponseDTO> {
    return this.http.get<VagaResponseDTO>(`${this.apiUrl}/encerrar/${id}`, { withCredentials: true });
  }
}
