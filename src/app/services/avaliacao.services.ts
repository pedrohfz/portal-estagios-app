import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvaliacaoEmpresaRequestDTO {
  nota: number;
  comentario: string;
  empresaId?: number;
}

export interface AvaliacaoEmpresaResponseDTO {
  id: number;
  nota: number;
  comentario: string;
  dataAvaliacao: string;
}

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private apiUrl = 'http://localhost:8080/portalestagios/api/avaliar-empresa';

  constructor(private http: HttpClient) {}

  listar(id: number): Observable<AvaliacaoEmpresaResponseDTO[]> {
    return this.http.get<AvaliacaoEmpresaResponseDTO[]>(`${this.apiUrl}/listar/${id}`, { withCredentials: true });
  }

  obter(id: number): Observable<AvaliacaoEmpresaResponseDTO> {
    return this.http.get<AvaliacaoEmpresaResponseDTO>(`${this.apiUrl}/obter/${id}`, { withCredentials: true });
  }

  salvar(avaliacao: AvaliacaoEmpresaRequestDTO): Observable<AvaliacaoEmpresaResponseDTO> {
    console.log("entrou");
    return this.http.post<AvaliacaoEmpresaResponseDTO>(`${this.apiUrl}/salvar`, avaliacao, { withCredentials: true });
  }

}
