import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from '../../../services/areas.services';
import { VagaRequestDTO, VagaService, Modalidade, VagaResponseDTO } from '../../../services/vaga.services';
import { InscricaoRequestDTO, InscricaoService } from '../../../services/inscricao.services';

@Component({
  selector: 'app-vagas-form-visualizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vagas-form-visualizar.component.html',
  styleUrl: './vagas-form-visualizar.component.scss'
})
export class VagasFormVisualizarComponent {
  inscricao: InscricaoRequestDTO = {
    vagaId: 0
  };
  vaga: VagaResponseDTO = {
    id: 0,
    titulo: '',
    descricao: '',
    localizacao: '',
    modalidade: Modalidade.PRESENCIAL,
    cargaHoraria: '',
    requisitos: '',
    empresaId: 0,
    empresaNome: '',
    areaId: 0,
    areaNome: '',
    situacao: ''
  };
  id?: number;
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';
  areasDisponiveis: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private inscricaoService: InscricaoService,
    private vagaService: VagaService,
    private router: Router,
    private areasServices: AreasService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
      
    this.areasServices.listar().subscribe(data => {
      this.areasDisponiveis = data;
    });

    if (this.id) {

      this.inscricao = {
        vagaId: this.id
      }

      this.vagaService.obter(this.id).subscribe(data => {
        this.vaga = {
          id: data.id,
          titulo: data.titulo,
          descricao: data.descricao,
          localizacao: data.localizacao,
          modalidade: data.modalidade,
          cargaHoraria: data.cargaHoraria,
          requisitos: data.requisitos,
          empresaId: data.empresaId,
          empresaNome: data.empresaNome,
          areaId: data.areaId,
          areaNome: data.areaNome,
          situacao: data.situacao
          
        };
      });
    }
  }

  enviarForm() {
    this.errosValidacao = {};

    this.inscricaoService.inscrever(this.inscricao).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!";
        this.errosValidacao = {};

        window.scrollTo({ top: 0, behavior: 'smooth' });

      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          this.errosValidacao = err.error;
        } else {
          this.erro = true;
          this.mensagem = err.error;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

      }
    });
  }

  voltar() {
    this.router.navigate(['/vagas/disponiveis']);
  }

}
