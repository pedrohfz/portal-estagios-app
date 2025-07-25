import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudanteRequestDTO, EstudanteService } from '../../../services/estudante.services';
import { AreasService } from '../../../services/areas.services';

@Component({
  selector: 'app-estudante-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudantes-form.component.html',
})
export class EstudantesFormComponent implements OnInit {
  estudante: EstudanteRequestDTO = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    curso: '',
    idsAreasInteresse: []
  };
  modoEdicao = false;
  id?: number;
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';
  areasDisponiveis: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private estudanteService: EstudanteService,
    private router: Router,
    private areasServices: AreasService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.areasServices.listar().subscribe(data => {
      this.areasDisponiveis = data;
    });
    
    if (this.id) {
      this.modoEdicao = true;
      this.estudanteService.obter(this.id).subscribe(data => {
        this.estudante = {
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          curso: data.curso,
          idsAreasInteresse: data.areasInteresse?.map(area => area.id) || []
        };
      });
    }
  }

  salvar() {
    this.errosValidacao = {};

    this.estudanteService.salvar(this.estudante).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.estudante = {
          nome: '',
          cpf: '',
          email: '',
          senha: '',
          curso: '',
          idsAreasInteresse: []
        };
        this.errosValidacao = {};      
      },
      error: (err) => {

        if (err.status === 400 && err.error) {
          this.errosValidacao = err.error;
        } else {
          this.erro = true;
          this.mensagem = err.error;
        }
      }
    });
  }

  atualizar() {
    this.errosValidacao = {};

    this.estudanteService.atualizar(this.id!, this.estudante).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.estudante = {
          nome: '',
          cpf: '',
          email: '',
          senha: '',
          curso: '',
          idsAreasInteresse: []
        };
        this.errosValidacao = {}; 
      },
      error: (err) => {
        if (err.status === 400 && err.error?.errors) {
          for (const erro of err.error.errors) {
            this.errosValidacao[erro.field] = erro.defaultMessage;
          }
        } 
      }
    });
  }

  enviarForm() {
    this.errosValidacao = {};

    if (this.modoEdicao && this.id) {
      this.atualizar();
    } else {
      this.salvar();
    }
  }

  voltar() {
    console.log('voltando...');
    this.router.navigate(['/estudantes']);
  }

}
