import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioResponseDTO, UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-list.component.html',
})
export class UsuarioListComponent implements OnInit {
  usuarios: UsuarioResponseDTO[] = [];
  erro = false;
  sucesso = false;
  errosValidacao: any = {};
  mensagem = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listar().subscribe(data => {
      this.usuarios = data;
    });
  }

  deletar(id: number) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    this.usuarioService.deletar(id).subscribe({
      next: () => {
        this.carregarUsuarios(); 
        this.sucesso = true;
        this.mensagem = "Operação realizada com sucesso!";
      },
      error: (err) => {
        this.sucesso = false;
        this.erro = true;
        this.mensagem = err.error;
      }
    });
  }
}

}
