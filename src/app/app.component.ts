import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuComponent, CommonModule],
  template: `
    <app-menu *ngIf="mostrarMenu"></app-menu>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  mostrarMenu = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
      this.mostrarMenu = !(event.url.includes('/login') || event.url.includes('/cadastro'));

    });

  }
}
