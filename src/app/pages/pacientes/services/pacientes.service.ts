import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  constructor(private http: HttpClient) {}

  public getPacientes(
  nomePaciente?: string,
  cpf?: number,
  dataNascimento?: string
) {
  let params = new HttpParams();

  if (nomePaciente) {
    params = params.set('nomePaciente', nomePaciente);
  }

  if (cpf) {
    params = params.set('cpf', cpf.toString());
  }

  if (dataNascimento) {
    params = params.set('dataNascimento', dataNascimento);
  }

  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<any[]>(
    'https://localhost:7174/api/Paciente/obter-pacientes',
    { params, headers }
  );
}

}
