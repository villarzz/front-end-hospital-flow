import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InternacoesService {
  constructor(private http: HttpClient) {}

  public postInternacao(
    dataInicio: string,
    dataFim: string,
    pacienteId: number,
    acomodacaoId: number,
    statusInternacaoId: number
  ){
    const body = {
      dataInicio: dataInicio,
      dataFim: dataFim,
      pacienteId: pacienteId,
      acomodacaoId: acomodacaoId,
      statusInternacaoId: statusInternacaoId,
    };

    return this.http.post(
      'https://localhost:7174/api/Internacoes/criar-internacao',
      body
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

    return this.http.get<any[]>(
      'https://localhost:7174/api/Internacoes/obter-internacoes',
      { params }
    );
  }
}
