import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VagaService, VagaResponseDTO } from '../../../services/vaga.services'; 
import { AvaliacaoEmpresaResponseDTO, AvaliacaoService } from '../../../services/avaliacao.services';
import { switchMap, tap } from 'rxjs/operators'; 

@Component({
  selector: 'app-estudantes-form-avaliar-visual',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudantes-form-avaliar-visual.component.html',
  styleUrl: './estudantes-form-avaliar-visual.component.scss'
})
export class EstudantesFormAvaliarVisualComponent implements OnInit { 

  id?: number;
  tituloVaga = '';
  empresaNome? = '';
  empresaId = 0; 
  avaliacoes: AvaliacaoEmpresaResponseDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private avaliacaoService: AvaliacaoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.vagaService.obter(this.id).pipe(
        tap((data: VagaResponseDTO) => { 
          this.tituloVaga = data.titulo;
          this.empresaNome = data.empresaNome;
          this.empresaId = data.empresaId;
          console.log('empresaId dentro do tap:', this.empresaId); 
        }),
        switchMap((data: VagaResponseDTO) => { 
          console.log('Chamando avaliacaoService.listar com empresaId:', data.empresaId);
          return this.avaliacaoService.listar(data.empresaId);
        })
      ).subscribe(avaliacoesData => {
        this.avaliacoes = avaliacoesData;
        console.log('Avaliações carregadas:', this.avaliacoes);
      }, error => {
        console.error('Erro ao carregar vaga ou avaliações:', error);
      });
    }
  }

  voltar() {
    this.router.navigate(['/vagas/disponiveis']);
  }
}