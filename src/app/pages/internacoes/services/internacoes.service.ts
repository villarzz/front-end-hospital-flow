import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class InternacoesService {
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) { }

  private formatarData(data: string): string {
    if (!data) return '';

    const dateObj = new Date(data);

    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // mês começa do 0
    const ano = dateObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  private formatarDataDdMmYyyy(data: string): string {
    if (data?.length !== 8) return data; // Retorna como está se não tiver 8 dígitos
    const dia = data.substring(0, 2);
    const mes = data.substring(2, 4);
    const ano = data.substring(4, 8);
    return `${dia}/${mes}/${ano}`;
  }

  public postInternacao(
    dataInicio: string,
    dataFim: string, 
    pacienteId: number,
    acomodacaoId: number,
    statusInternacaoId: number
  ) {
    const dataInicioFormatada = this.formatarDataDdMmYyyy(dataInicio);
    const dataFimFormatada = this.formatarDataDdMmYyyy(dataFim);

    const body = {
      dataInicio: dataInicioFormatada,
      dataFim: dataFimFormatada,
      pacienteId,
      acomodacaoId,
      statusInternacaoId,
    };

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      'https://localhost:7174/api/Internacoes/criar-internacao',
      body,
      { headers, responseType: 'text' }
    );
  }

  public putInternacao(
    internacaoId: number,
    dataInicio: string,
    dataFim: string,
    pacienteId: number,
    acomodacaoId: number,
    statusInternacaoId: number
  ) {
    const dataInicioFormatada = this.formatarDataDdMmYyyy(dataInicio);
    const dataFimFormatada = this.formatarDataDdMmYyyy(dataFim);

    const body = {
      id: internacaoId,
      dataInicio: dataInicioFormatada,
      dataFim: dataFimFormatada,
      pacienteId,
      acomodacaoId,
      statusInternacaoId,
    };

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(
      'https://localhost:7174/api/Internacoes/atualizar-internacao',
      body,
      { headers, responseType: 'text' }
    );
  }

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

    let token = '';
    if (this.document.defaultView?.localStorage) {
      token = this.document.defaultView.localStorage.getItem('token') || '';
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(
      'https://localhost:7174/api/Internacoes/obter-internacoes',
      { params, headers }
    );
  }

  public deletarInternacao(id: number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(
      `https://localhost:7174/api/Internacoes/deletar-internacao/${id}`,
      { headers, responseType: 'text' }
    )
  }
}
