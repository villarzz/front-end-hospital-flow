import { Component, OnInit } from '@angular/core';
import { InternacoesService } from './services/internacoes.service';
import { PacientesService } from '../pacientes/services/pacientes.service';

@Component({
  selector: 'app-internacoes',
  templateUrl: './internacoes.component.html',
  styleUrl: './internacoes.component.css',
})
export class InternacoesComponent implements OnInit {
  constructor(
    private internacoesService: InternacoesService,
    private readonly _pacientesService: PacientesService
  ) {}

  dataFim!: string;
  paciente!: string;
  convenio!: string;
  dataInicio!: string;
  modalAberta = false;
  pacienteId!: number;
  atendimento!: string;
  pacientes: any[] = [];
  acomodacaoId!: number;
  internacoes: any[] = [];
  statusInternacao!: string;
  statusInternacaoId!: number;

  ngOnInit(): void {
    this.getInternacoes();
  }

  abrirModal() {
    this.modalAberta = true;
    this._pacientesService.getPacientes().subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
  }

  fecharModal() {
    this.modalAberta = false;
  }

  postInternacao() {
    this.internacoesService
      .postInternacao(
        this.dataInicio,
        this.dataFim,
        this.pacienteId,
        this.acomodacaoId,
        this.statusInternacaoId
      )
      .subscribe({
        next: (response) => {
          console.log('Internação criada com sucesso:', response);
          this.getInternacoes(); // Refresh the list after posting
        },
        error: (error) => {
          console.error('Erro ao criar internação:', error);
        },
      });
  }

  getInternacoes() {
    this.internacoesService
      .getInternacoes(
        this.atendimento,
        this.paciente,
        this.convenio,
        this.statusInternacao
      )
      .subscribe((data) => {
        this.internacoes = data;
      });
  }
}
