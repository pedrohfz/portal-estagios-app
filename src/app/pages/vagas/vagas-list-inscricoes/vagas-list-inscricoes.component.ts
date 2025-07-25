import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InscricaoResponseDTO, InscricaoService } from '../../../services/inscricao.services';

@Component({
  selector: 'app-vagas-list-inscricoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vagas-list-inscricoes.component.html',
  styleUrl: './vagas-list-inscricoes.component.scss'
})
export class VagasListInscricoesComponent {
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
    this.inscricaoService.listarInscricoesDoEstudante().subscribe(data => {
      this.inscricoes = data;
    });
  }

}
