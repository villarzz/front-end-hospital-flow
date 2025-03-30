import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  senha!: string;
  usuario!: string;

  constructor(private router: Router) {}

  entrar() {
    this.router.navigate(['/internacoes']);
  }
}
