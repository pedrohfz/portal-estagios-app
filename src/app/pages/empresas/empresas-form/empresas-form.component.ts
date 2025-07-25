import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaRequestDTO, EmpresaService } from '../../../services/empresa.services';
import { AreasService } from '../../../services/areas.services';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas-form.component.html',
})
export class EmpresaFormComponent implements OnInit {
  empresa: EmpresaRequestDTO = {
    nome: '',
    cnpj: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
    idsAreasAtuacao: []
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
    private empresaService: EmpresaService,
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
      this.empresaService.obter(this.id).subscribe(data => {
        this.empresa = {
          nome: data.nome,
          cnpj: data.cnpj,
          email: data.email,
          telefone: data.telefone,
          endereco: data.endereco,
          idsAreasAtuacao: data.areasAtuacao?.map(area => area.id) || []
        };
      });
    }
  }

  salvar() {
    this.errosValidacao = {};

    this.empresaService.salvar(this.empresa).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.empresa = {
          nome: '',
          cnpj: '',
          email: '',
          senha: '',
          telefone: '',
          endereco: '',
          idsAreasAtuacao: []
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

    this.empresaService.atualizar(this.id!, this.empresa).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.empresa = {
          nome: '',
          cnpj: '',
          email: '',
          senha: '',
          telefone: '',
          endereco: '',
          idsAreasAtuacao: []
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
    console.log("entrou enviar form");

    this.errosValidacao = {};

    if (this.modoEdicao && this.id) {
      this.atualizar();
    } else {
      this.salvar();
    }
  }

  voltar() {
    console.log('voltando...');
    this.router.navigate(['/empresas']);
  }

}
