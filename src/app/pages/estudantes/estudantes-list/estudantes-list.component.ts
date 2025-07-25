import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstudanteResponseDTO, EstudanteService } from '../../../services/estudante.services';

@Component({
  selector: 'app-estudante-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estudantes-list.component.html',
})
export class EstudantesListComponent implements OnInit {
  estudantes: EstudanteResponseDTO[] = [];
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(private estudanteService: EstudanteService) {}

  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes() {
    this.estudanteService.listar().subscribe(data => {
      this.estudantes = data;
    });
  }


  deletar(id: number) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    this.estudanteService.deletar(id).subscribe({
      next: () => {
        this.carregarEstudantes(); 
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
