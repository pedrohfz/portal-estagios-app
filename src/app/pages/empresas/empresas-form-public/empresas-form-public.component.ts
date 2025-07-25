import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AreaInteresseResponseDTO, EmpresaRequestDTO, EmpresaService } from '../../../services/empresa.services';
import { AreasService } from '../../../services/areas.services';

@Component({
  selector: 'app-empresas-form-public',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas-form-public.component.html',
  styleUrl: './empresas-form-public.component.scss'
})
export class EmpresasFormPublicComponent implements OnInit {
  empresa: EmpresaRequestDTO = {
    nome: '',
    cnpj: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
    idsAreasAtuacao: []
  };

  mensagem = '';
  sucesso = false;
  errosValidacao: any = {};
  areasDisponiveis: any[] = [];

  constructor(
    private empresaService: EmpresaService,
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

    this.empresaService.salvar(this.empresa).subscribe({
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

