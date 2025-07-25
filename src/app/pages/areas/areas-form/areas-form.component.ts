import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasRequestDTO, AreasService } from '../../../services/areas.services';

@Component({
  selector: 'app-areas-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './areas-form.component.html',
})
export class AreasFormComponent implements OnInit {
  areas: AreasRequestDTO = { nome: '' };
  modoEdicao = false;
  id?: number;
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(
    private route: ActivatedRoute,
    private areasService: AreasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.modoEdicao = true;
      this.areasService.obter(this.id).subscribe(data => {
        this.areas = { nome: data.nome};
      });
    }
  }


  salvar() {
    this.errosValidacao = {};

    this.areasService.salvar(this.areas).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.areas = { nome: '' };
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

    this.areasService.atualizar(this.id!, this.areas).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.areas = { nome: '' };
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
    this.router.navigate(['/areas']);
  }

}
