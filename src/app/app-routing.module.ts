import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InternacoesComponent } from './pages/internacoes/internacoes.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },  // Rota padrão
  { path: 'internacoes', component: InternacoesComponent },  // Rota para Internações
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Rota para páginas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
