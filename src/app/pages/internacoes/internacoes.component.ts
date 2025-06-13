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
    private readonly _pacientesService: PacientesService,
    private readonly internacoesService: InternacoesService
  ) { }

  dataFim!: string;
  paciente!: string;
  convenio!: string;
  dataInicio!: string;
  modalAberta = false;
  pacienteId!: number;
  atendimento!: string;
  pacientes: any[] = [];
  acomodacaoId!: number;
  internacaoId!: number;
  internacoes: any[] = [];
  modalAbertaEdicao = false;
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

  abrirModalEdicao(internacao: any) {
    console.log(internacao);

    this._pacientesService.getPacientes().subscribe((pacientes) => {
      this.pacientes = pacientes;
      this.pacienteId = internacao.pacienteId;
    });
    this.internacaoId = internacao.id;
    this.dataInicio = internacao.dataInicio;
    this.dataFim = internacao.dataFim;
    this.acomodacaoId = internacao.acomodacaoId;
    this.statusInternacaoId = internacao.statusInternacaoId;
    this.modalAbertaEdicao = true;
  }

  fecharModal() {
    this.modalAberta = false;
  }

  fecharModalEdicao() {
    this.modalAbertaEdicao = false;
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
            this.fecharModal();
            this.getInternacoes();
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

  putInternacao() {
    this.internacoesService
      .putInternacao(
        this.internacaoId,
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
            title: 'Internação alterada!',
            text: 'A internação foi alterada com sucesso.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            this.fecharModalEdicao();
            this.getInternacoes();
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao alterar internação',
            text: error?.error?.message || 'Algo deu errado. Tente novamente.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Fechar',
          }).then(() => {
            this.fecharModalEdicao();
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
        this.internacoes = data;
      });
  }

  excluirInternacao(internacaoId: number) {
    Swal.fire({
      title: "Tem certeza que deseja finalizar essa internação?",
      showDenyButton: true,
      confirmButtonText: "Sim",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.internacoesService.deletarInternacao(internacaoId).subscribe({
          next:()=>{
            Swal.fire("Internação finalizada!", "", "success").then(() => {
              this.getInternacoes();
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
