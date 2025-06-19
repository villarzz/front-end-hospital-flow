import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { InternacoesComponent } from './pages/internacoes/internacoes.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InternacoesComponent,
    PacientesComponent,
    SideBarComponent,
    RelatoriosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration(), provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
