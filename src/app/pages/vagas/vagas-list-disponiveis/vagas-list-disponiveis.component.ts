import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VagaResponseDTO, VagaService } from '../../../services/vaga.services';

@Component({
  selector: 'app-vagas-list-disponiveis',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vagas-list-disponiveis.component.html',
  styleUrl: './vagas-list-disponiveis.component.scss'
})
export class VagasListDisponiveisComponent {
  vagas: VagaResponseDTO[] = [];
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(private vagaService: VagaService) {}

  ngOnInit(): void {
    this.carregarVagas();
  }

  carregarVagas() {
    this.vagaService.listarDisponiveis().subscribe(data => {
      this.vagas = data;
    });
  }

}
