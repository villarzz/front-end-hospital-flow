import { Component, OnInit } from '@angular/core';
import { PacientesService } from './services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  cpf!: number;
  modal = false;
  nome!: string;
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

  getPacientes() {
    this._pacientesService
      .getPacientes(this.nome, this.cpf, this.dataNascimento)
      .subscribe((data) => {
        this.pacientes = data;
      });
  }

  abrirModal() {
    this.modal = true;
  }

  fecharModal() {
    this.modal = false;
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
        }
      })
  }
}
