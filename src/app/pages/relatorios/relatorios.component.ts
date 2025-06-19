import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PacientesService } from '../pacientes/services/pacientes.service';
import { RelatoriosService } from './services/relatorios.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent {
  constructor(private relatoriosService: RelatoriosService) {}

  convenio: string = '';
  atendimento: string = '';
  nomePaciente: string = '';
  statusInternacao: string = '';

  gerarRelatorioDeInternacoes() {
    this.relatoriosService
      .gerarRelatorioDeInternacoes(
        this.atendimento,
        this.nomePaciente,
        this.convenio,
        this.statusInternacao
      )
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'relatorio_internacoes.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao gerar relatório',
            text: error.error || 'Ocorreu um erro ao gerar o relatório.',
          });
        },
      });
  }
}
