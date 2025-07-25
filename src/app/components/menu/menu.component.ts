import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  perfil = '';
  nomeUsuario = '';

  constructor(private authService: AuthService, private router: Router) {
    const usuario = this.authService.getUsuario();
    this.perfil = usuario?.perfil || '';
    this.nomeUsuario = usuario?.nome ?? '';

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
