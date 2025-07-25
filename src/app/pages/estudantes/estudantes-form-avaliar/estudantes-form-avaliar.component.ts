import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaRequestDTO, EmpresaService } from '../../../services/empresa.services';
import { AreasService } from '../../../services/areas.services';
import { AvaliacaoEmpresaRequestDTO, AvaliacaoService } from '../../../services/avaliacao.services';

@Component({
  selector: 'app-estudantes-form-avaliar',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './estudantes-form-avaliar.component.html',
  styleUrl: './estudantes-form-avaliar.component.scss'
})
export class EstudantesFormAvaliarComponent implements OnInit {

  avaliacao: AvaliacaoEmpresaRequestDTO = {
    nota: 0,
    comentario: '',
    empresaId: 0
  };

  id?: number;
  nomeEmpresa = '';
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';
  areasDisponiveis: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private router: Router,
    private avaliacaoService: AvaliacaoService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.id) {
      this.empresaService.obter(this.id).subscribe(data => {
        this.nomeEmpresa = data.nome;

        this.avaliacao = {
          nota: 0,
          comentario: '',
          empresaId: this.id
        }
      });
    }
  }

  salvar() {

    this.errosValidacao = {};

    this.avaliacaoService.salvar(this.avaliacao).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.avaliacao = {
          nota: 0,
          comentario: '',
          empresaId: 0
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

  voltar() {
    console.log('voltando...');
    this.router.navigate(['/estudantes/avaliar']);
  }

}
