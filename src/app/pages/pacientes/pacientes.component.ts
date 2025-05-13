import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  nome!: string;
  convenio!: string;
  cpf!: string;
  atendimento!: string;
  pacientes: any[] = [];
  dataNascimento!: string;

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(){

  }

  postPaciente(){

  }
}
