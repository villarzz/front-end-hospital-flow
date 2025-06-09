import { Component, OnInit } from '@angular/core';
import { PacientesService } from './services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  cpf!: number;
  nome!: string;
  atendimento!: string;
  pacientes: any[] = [];
  dataNascimento!: string;

  constructor(private readonly _pacientesService: PacientesService) {}

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(){
    this._pacientesService
      .getPacientes(this.nome, this.cpf, this.dataNascimento)
      .subscribe((data) => {
        this.pacientes = data;
      });
  }

  postPaciente(){

  }
}
