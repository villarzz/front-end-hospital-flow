import Swal from 'sweetalert2';
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
      console.log('Pacientes recebidos:', pacientes);
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
          Swal.fire({
            icon: 'success',
            title: 'Internação criada!',
            text: 'A internação foi registrada com sucesso.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            this.fecharModal(); // <<-- Chama aqui o método que fecha sua modal
            this.getInternacoes(); // Atualiza lista depois de fechar tudo
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao criar internação',
            text: error?.error?.message || 'Algo deu errado. Tente novamente.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Fechar',
          });
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
        console.log(data);

        this.internacoes = data;
      });
  }
}
