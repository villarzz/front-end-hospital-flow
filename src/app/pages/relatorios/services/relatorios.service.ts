import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private formatarDataDdMmYyyy(data: string): string {
    if (data?.length !== 8) return data; // Retorna como está se não tiver 8 dígitos
    const dia = data.substring(0, 2);
    const mes = data.substring(2, 4);
    const ano = data.substring(4, 8);
    return `${dia}/${mes}/${ano}`;
  }

  public gerarRelatorioDeInternacoes(
    atendimento: string,
    nomePaciente: string,
    convenio: string,
    statusInternacao: string
  ) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Monta a query string com os parâmetros
    const params = new HttpParams()
      .set('atendimento', atendimento)
      .set('nomePaciente', nomePaciente)
      .set('convenio', convenio)
      .set('statusInternacao', statusInternacao);

    return this.http.get(
      'https://localhost:7174/api/Relatorios/relatorio-internacoes',
      {
        headers,
        params,
        responseType: 'blob', // <- importante para receber arquivo binário
      }
    );
  }
}
