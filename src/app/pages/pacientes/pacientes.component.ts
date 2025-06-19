import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { PacientesService } from './services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  cpf!: number;
  modal = false;
  nome!: string;
  modalEdicao = false;
  cpfPaciente!: number;
  atendimento!: string;
  nomePaciente!: string;
  pacientes: any[] = [];
  dataNascimento!: string;
  convenioPaciente!: string;
  dataNascimentoPaciente!: string;

  constructor(private readonly _pacientesService: PacientesService) { }

  ngOnInit(): void {
    this.getPacientes();
  }

  abrirModal() {
    this.modal = true;
  }

  fecharModal() {
    this.modal = false;
  }

  abrirModalEdicao() {
    this.modalEdicao = true;
  }

  fecharModalEdicao() {
    this.modalEdicao = false;
  }

  getPacientes() {
    this._pacientesService
      .getPacientes(this.nome, this.cpf, this.dataNascimento)
      .subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao buscar pacientes',
            text: error.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          if (error.status === 401){
            window.location.href = '/login';
          }
        },
      })
  }

  postPaciente() {
    this._pacientesService
      .postPaciente(this.nomePaciente, this.dataNascimentoPaciente, this.cpfPaciente, this.convenioPaciente)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Paciente criadao!',
            text: 'O paciente foi registrada com sucesso.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            this.fecharModal();
            this.getPacientes();
          });
        },
      })
  }
}
