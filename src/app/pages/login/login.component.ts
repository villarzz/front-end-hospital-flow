import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  senha!: string;
  usuario!: string;

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {}

  entrar() {
    this.authService.postAuth(this.usuario, this.senha).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/internacoes']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
