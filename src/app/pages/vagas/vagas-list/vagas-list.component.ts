import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VagaResponseDTO, VagaService } from '../../../services/vaga.services';

@Component({
  selector: 'app-vaga-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vagas-list.component.html',
})
export class VagasListComponent implements OnInit {
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
    this.vagaService.listarByEmpresa().subscribe(data => {
      this.vagas = data;
    });
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      this.vagaService.deletar(id).subscribe({
        next: () => {
          this.carregarVagas(); 
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

  encerrar(id: number) {
    if (confirm('Tem certeza que deseja encerrar está vaga?')) {
      this.vagaService.encerrar(id).subscribe({
        next: () => {
          this.carregarVagas(); 
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
