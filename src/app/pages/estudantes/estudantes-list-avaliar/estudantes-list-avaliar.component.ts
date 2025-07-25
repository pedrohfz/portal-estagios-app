import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpresaResponseDTO, EmpresaService } from '../../../services/empresa.services';

@Component({
  selector: 'app-estudantes-list-avaliar',
  standalone: true,
  imports: [CommonModule, RouterModule],  templateUrl: './estudantes-list-avaliar.component.html',
  styleUrl: './estudantes-list-avaliar.component.scss'
})
export class EstudantesListAvaliarComponent implements OnInit {

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

}
