import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpresaResponseDTO, EmpresaService } from '../../../services/empresa.services';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empresas-list.component.html',
})
export class EmpresaListComponent implements OnInit {
  empresas: EmpresaResponseDTO[] = [];
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.empresaService.listar().subscribe(data => {
      this.empresas = data;
    });
  }

  deletar(id: number) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    this.empresaService.deletar(id).subscribe({
      next: () => {
        this.carregarEmpresas(); 
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!";
      },
      error: (err) => {
        this.sucesso = false;
        this.erro = true;
        this.mensagem = err.error;
      }
    });
  }
}

}
