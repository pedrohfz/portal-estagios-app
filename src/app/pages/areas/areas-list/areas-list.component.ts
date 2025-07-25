import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AreasResponseDTO, AreasService } from '../../../services/areas.services';

@Component({
  selector: 'app-areas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './areas-list.component.html',
})
export class AreasListComponent implements OnInit {
  areas: AreasResponseDTO[] = [];
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(private areasService: AreasService) {}

  ngOnInit(): void {
    this.carregarAreass();
  }

  carregarAreass() {
    this.areasService.listar().subscribe(data => {
      this.areas = data;
    });
  }

  deletar(id: number) {
  if (confirm('Tem certeza que deseja excluir esta área?')) {
    this.areasService.deletar(id).subscribe({
      next: () => {
        this.carregarAreass(); 
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
