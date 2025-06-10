import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InternacoesService {
  constructor(private http: HttpClient) { }

  private formatarData(data: string): string {
    if (!data) {
      return '';
    }
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  public postInternacao(
    dataInicio: string,
    dataFim: string,
    pacienteId: number,
    acomodacaoId: number,
    statusInternacaoId: number
  ) {
    const dataInicioFormatada = this.formatarData(dataInicio);
    const dataFimFormatada = this.formatarData(dataFim);

    const body = {
      dataInicio: dataInicioFormatada,
      dataFim: dataFimFormatada,
      pacienteId: pacienteId,
      acomodacaoId: acomodacaoId,
      statusInternacaoId: statusInternacaoId,
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log(headers);

    return this.http.post(
      'https://localhost:7174/api/Internacoes/criar-internacao',
      body,
      { headers }
    );
  };

  public getInternacoes(
    atendimento?: string,
    nomePaciente?: string,
    convenio?: string,
    statusInternacao?: string
  ) {
    let params = new HttpParams();

    if (atendimento != null && atendimento !== '') {
      params = params.set('atendimento', atendimento);
    }
    if (nomePaciente != null && nomePaciente !== '') {
      params = params.set('nomePaciente', nomePaciente);
    }
    if (convenio != null && convenio !== '') {
      params = params.set('convenio', convenio);
    }
    if (statusInternacao != null && statusInternacao !== '') {
      params = params.set('statusInternacao', statusInternacao);
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      'https://localhost:7174/api/Internacoes/obter-internacoes',
      { params, headers }
    );
  }
}
