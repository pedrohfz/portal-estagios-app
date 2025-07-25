import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from '../../../services/areas.services';
import { VagaRequestDTO, VagaService, Modalidade } from '../../../services/vaga.services';

@Component({
  selector: 'app-vagas-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vagas-form.component.html',
})
export class VagasFormComponent implements OnInit {
  vaga: VagaRequestDTO = {
    titulo: '',
    descricao: '',
    localizacao: '',
    modalidade: Modalidade.PRESENCIAL, 
    cargaHoraria: '',
    requisitos: '',
    areaId: 0
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
    private vagaService: VagaService,
    private router: Router,
    private areasServices: AreasService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
      
    this.areasServices.listarAreasEmpresa().subscribe(data => {
      this.areasDisponiveis = data;
    });

    if (this.id) {
      this.modoEdicao = true;
      this.vagaService.obter(this.id).subscribe(data => {
        this.vaga = {
          titulo: data.titulo,
          descricao: data.descricao,
          localizacao: data.localizacao,
          modalidade: data.modalidade,
          cargaHoraria: data.cargaHoraria,
          requisitos: data.requisitos || '',
          areaId: data.areaId
        };
      });
    }
  }

  salvar() {
    this.errosValidacao = {};

    this.vagaService.salvar(this.vaga).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!";
        this.vaga = {
          titulo: '',
          descricao: '',
          localizacao: '',
          modalidade: Modalidade.PRESENCIAL,
          cargaHoraria: '',
          requisitos: '',
          areaId: 0
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

    this.vagaService.atualizar(this.id!, this.vaga).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!";
        this.vaga = {
          titulo: '',
          descricao: '',
          localizacao: '',
          modalidade: Modalidade.PRESENCIAL,
          cargaHoraria: '',
          requisitos: '',
          areaId: 0
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
    this.router.navigate(['/vagas']);
  }
}
