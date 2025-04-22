import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public postAuth(
    usuario: string,
    senha: string
  ): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      'https://localhost:7174/api/auth/login',
      {
        nomeUsuario: usuario,
        senha,
      }
    );
  }
}
