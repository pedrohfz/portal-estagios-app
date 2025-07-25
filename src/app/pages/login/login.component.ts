import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  senha = '';
  erroLogin = false;
  mensagemLogin = '';
  errosValidacao: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin() {
    this.errosValidacao = {};
    this.mensagemLogin = '';

    this.authService.login(this.email, this.senha).subscribe({

      next: (usuario: any) => {
        this.authService.salvarUsuario(usuario);
        
        const perfil = usuario.perfil;

        console.log(perfil);
        
        switch (perfil) {
          case 'ADMIN':
            this.router.navigate(['/dashboard']);
            break;
          case 'EMPRESA':
            this.router.navigate(['/empresas/estudantes/inscritos']);
            break;
          case 'ESTUDANTE':
          default:
            this.router.navigate(['/vagas/disponiveis']);
            break;
        }
      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          this.errosValidacao = err.error;
        } else {
          this.erroLogin = true;
          this.mensagemLogin = err.error;
        }
      },
    });
  }

  cadastrarEstudante() {
    console.log("cadastrar estudante");
    this.router.navigate(['/cadastro']);
  }

  cadastrarEmpresa() {
    console.log("cadastrar empresa");
    this.router.navigate(['/cadastro-empresa']);
  }
}
