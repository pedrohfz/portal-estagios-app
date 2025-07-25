import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InscricaoResponseDTO, InscricaoService } from '../../../services/inscricao.services';

@Component({
  selector: 'app-estudantes-list-inscricoes',
  standalone: true,
  imports: [CommonModule, RouterModule],  templateUrl: './estudantes-list-inscricoes.component.html',
  styleUrl: './estudantes-list-inscricoes.component.scss'
})
export class EstudantesListInscricoesComponent {
  inscricoes: InscricaoResponseDTO[] = [];
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(private inscricaoService: InscricaoService) {}

  ngOnInit(): void {
    this.carregarInscricoes();
  }

  carregarInscricoes() {
    this.inscricaoService.listarInscricoesDaEmpresa().subscribe(data => {
      this.inscricoes = data;
    });
  }

}
