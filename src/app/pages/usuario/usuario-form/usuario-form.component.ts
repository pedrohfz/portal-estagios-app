import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioRequestDTO, UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent implements OnInit {
  usuario: UsuarioRequestDTO = { nome: '', email: '', senha: '' };
  modoEdicao = false;
  id?: number;
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.modoEdicao = true;
      this.usuarioService.obter(this.id).subscribe(data => {
        this.usuario = { nome: data.nome, email: data.email };
      });
    }
  }


  salvar() {
    this.errosValidacao = {};

    this.usuarioService.salvar(this.usuario).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.usuario = { nome: '', email: '', senha: '' };
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

    this.usuarioService.atualizar(this.id!, this.usuario).subscribe({
      next: (res) => {
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!"  
        
        this.usuario = { nome: '', email: '', senha: '' };
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
    this.router.navigate(['/usuarios']);
  }

}
