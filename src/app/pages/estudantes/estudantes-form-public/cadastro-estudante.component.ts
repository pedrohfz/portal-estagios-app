import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AreaInteresseResponseDTO, EstudanteRequestDTO, EstudanteService } from '../../../services/estudante.services';
import { AreasService } from '../../../services/areas.services';

@Component({
  selector: 'app-cadastro-estudante',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-estudante.component.html',
})
export class CadastroEstudanteComponent implements OnInit {
  estudante: EstudanteRequestDTO = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    curso: '',
    idsAreasInteresse: []
  };

  mensagem = '';
  sucesso = false;
  errosValidacao: any = {};
  areasDisponiveis: any[] = [];

  constructor(
    private estudanteService: EstudanteService,
    private router: Router,
    private areasServices: AreasService
  ) {}

  ngOnInit(): void {
    this.areasServices.listar().subscribe(data => {
      this.areasDisponiveis = data;
    });
  }

  cadastrar() {
    this.errosValidacao = {};
    this.mensagem = '';

    this.estudanteService.salvar(this.estudante).subscribe({
      next: () => {
        window.alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.sucesso = false;
        if (err.status === 400 && err.error) {
          this.errosValidacao = err.error;
        } else {
          this.mensagem = 'Erro ao realizar cadastro.';
        }
      },
    });
  }
}
