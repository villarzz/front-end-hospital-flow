import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  constructor(private http: HttpClient) {}

  private formatarDataDdMmYyyy(data: string): string {
    if (data?.length !== 8) return data; // Retorna como está se não tiver 8 dígitos
    const dia = data.substring(0, 2);
    const mes = data.substring(2, 4);
    const ano = data.substring(4, 8);
    return `${dia}/${mes}/${ano}`;
  }

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
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(
      'http://localhost:5240/api/Paciente/obter-pacientes',
      { params, headers }
    );
  }

  public postPaciente(
    nomePaciente: string,
    dataNascimentoPaciente: string,
    cpfPaciente: number,
    convenioPaciente: string
  ) {
    dataNascimentoPaciente = this.formatarDataDdMmYyyy(dataNascimentoPaciente);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const body = {
      nome: nomePaciente,
      dataNascimento: dataNascimentoPaciente,
      cpf: cpfPaciente,
      convenio: convenioPaciente,
    };

    return this.http.post(
      'http://localhost:5240/api/Paciente/adicionar-paciente',
      body,
      { headers, responseType: 'text' }
    );
  }

  public putPaciente(
    id: number,
    nomePaciente: string,
    cpfPaciente: string,
    dataNascimentoPaciente: string,
    convenioPaciente: string
  ) {
    dataNascimentoPaciente = this.formatarDataDdMmYyyy(dataNascimentoPaciente);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const body = {
      cpf: cpfPaciente,
      nome: nomePaciente,
      dataNascimento: dataNascimentoPaciente,
      convenio: convenioPaciente,
    };

    return this.http.put(
      'http://localhost:5240/api/Paciente/editar-paciente',
      body,
      { headers, responseType: 'text' }
    );
  }
}
