import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InscricaoRequestDTO {
  vagaId: number;
}

export interface InscricaoResponseDTO {
  id: number;
  vagaId: number;
  tituloVaga: String;
  nomeEmpresa: String;
  nomeEstudante: String;
  dataInscricao: String;
}

@Injectable({
  providedIn: 'root',
})
export class InscricaoService {
  private apiUrl = 'http://localhost:8080/portalestagios/api/inscricao';

  constructor(private http: HttpClient) {}

  listarInscricoesDoEstudante(): Observable<InscricaoResponseDTO[]> {
    return this.http.get<InscricaoResponseDTO[]>(`${this.apiUrl}/listar-estudante`, { withCredentials: true });
  }

  listarInscricoesDaEmpresa(): Observable<InscricaoResponseDTO[]> {
    return this.http.get<InscricaoResponseDTO[]>(`${this.apiUrl}/listar-empresa`, { withCredentials: true });
  }

  inscrever(inscricao: InscricaoRequestDTO): Observable<InscricaoRequestDTO> {
    return this.http.post<InscricaoResponseDTO>(`${this.apiUrl}/inscrever`, inscricao, { withCredentials: true });
  }

}
