import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AreasRequestDTO {
  nome: string;
}

export interface AreasResponseDTO {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private apiUrl = 'http://localhost:8080/portalestagios/api/area-interesse';

  constructor(private http: HttpClient) {}

  listar(): Observable<AreasResponseDTO[]> {
    return this.http.get<AreasResponseDTO[]>(`${this.apiUrl}/listar`, { withCredentials: true });
  }

  listarAreasEmpresa(): Observable<AreasResponseDTO[]> {
    return this.http.get<AreasResponseDTO[]>(`${this.apiUrl}/listar-areas-empresa`, { withCredentials: true });
  } 

  obter(id: number): Observable<AreasResponseDTO> {
    return this.http.get<AreasResponseDTO>(`${this.apiUrl}/obter/${id}`, { withCredentials: true });
  }

  salvar(areas: AreasRequestDTO): Observable<AreasResponseDTO> {
    console.log("entrou no salvar do service");
    
    return this.http.post<AreasResponseDTO>(`${this.apiUrl}/salvar`, areas, { withCredentials: true });
  }

  atualizar(id: number, areas: AreasRequestDTO): Observable<AreasResponseDTO> {
    return this.http.put<AreasResponseDTO>(`${this.apiUrl}/alterar/${id}`, areas, { withCredentials: true });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`, { withCredentials: true });
  }
}
