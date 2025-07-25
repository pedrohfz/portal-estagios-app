import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioListComponent } from './pages/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './pages/usuario/usuario-form/usuario-form.component';
import { AreasListComponent } from './pages/areas/areas-list/areas-list.component';
import { AreasFormComponent } from './pages/areas/areas-form/areas-form.component';
import { EmpresaListComponent } from './pages/empresas/empresas-list/empresas-list.component';
import { EmpresaFormComponent } from './pages/empresas/empresas-form/empresas-form.component';
import { EstudantesListComponent } from './pages/estudantes/estudantes-list/estudantes-list.component';
import { EstudantesFormComponent } from './pages/estudantes/estudantes-form/estudantes-form.component';
import { VagasListComponent } from './pages/vagas/vagas-list/vagas-list.component';
import { VagasFormComponent } from './pages/vagas/vagas-form/vagas-form.component';
import { VagasListDisponiveisComponent } from './pages/vagas/vagas-list-disponiveis/vagas-list-disponiveis.component';
import { VagasFormVisualizarComponent } from './pages/vagas/vagas-form-visualizar/vagas-form-visualizar.component';
import { VagasListInscricoesComponent } from './pages/vagas/vagas-list-inscricoes/vagas-list-inscricoes.component';
import { EstudantesListInscricoesComponent } from './pages/estudantes/estudantes-list-inscricoes/estudantes-list-inscricoes.component';
import { EstudantesListAvaliarComponent } from './pages/estudantes/estudantes-list-avaliar/estudantes-list-avaliar.component';
import { EstudantesFormAvaliarComponent } from './pages/estudantes/estudantes-form-avaliar/estudantes-form-avaliar.component';
import { EstudantesFormAvaliarVisualComponent } from './pages/estudantes/estudantes-form-avaliar-visual/estudantes-form-avaliar-visual.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/estudantes/estudantes-form-public/cadastro-estudante.component').then(
        m => m.CadastroEstudanteComponent
      )
  },

  {
    path: 'cadastro-empresa',
    loadComponent: () =>
      import('./pages/empresas/empresas-form-public/empresas-form-public.component').then(
        m => m.EmpresasFormPublicComponent
      )
  },

  // Rotas de usuário
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/novo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },

  // Rotas de áreas de interesse
  { path: 'areas', component: AreasListComponent },
  { path: 'areas/novo', component: AreasFormComponent },
  { path: 'areas/editar/:id', component: AreasFormComponent },

  // Rotas de empresa
  { path: 'empresas', component: EmpresaListComponent },
  { path: 'empresas/novo', component: EmpresaFormComponent },
  { path: 'empresas/editar/:id', component: EmpresaFormComponent },
  { path: 'empresas/estudantes/inscritos', component: EstudantesListInscricoesComponent },
  { path: 'empresas/avaliacao/:id', component: EstudantesFormAvaliarVisualComponent },

  // Rotas de estudante
  { path: 'estudantes', component: EstudantesListComponent },
  { path: 'estudantes/novo', component: EstudantesFormComponent },
  { path: 'estudantes/editar/:id', component: EstudantesFormComponent },
  { path: 'estudantes/avaliar', component: EstudantesListAvaliarComponent },
  { path: 'estudantes/avaliar/empresa/:id', component: EstudantesFormAvaliarComponent },


   // Rotas de vaga
  { path: 'vagas', component: VagasListComponent },
  { path: 'vagas/novo', component: VagasFormComponent },
  { path: 'vagas/editar/:id', component: VagasFormComponent },
  { path: 'vagas/encerrar', component: VagasFormComponent },
  { path: 'vagas/disponiveis', component: VagasListDisponiveisComponent },
  { path: 'vagas/visualizar/:id', component: VagasFormVisualizarComponent },
  { path: 'vagas/inscricoes', component: VagasListInscricoesComponent },
  
];
