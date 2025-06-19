import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { InternacoesComponent } from './pages/internacoes/internacoes.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'internacoes', component: InternacoesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
