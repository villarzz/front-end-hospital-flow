import { Component, OnInit } from '@angular/core';
import { InternacoesService } from './services/internacoes.service';

@Component({
  selector: 'app-internacoes',
  templateUrl: './internacoes.component.html',
  styleUrl: './internacoes.component.css',
})
export class InternacoesComponent implements OnInit {
  constructor(private internacoesService: InternacoesService) {}

  paciente!: string;
  convenio!: string;
  atendimento!: string;
  internacoes: any[] = [];
  statusInternacao!: string;

  ngOnInit(): void {
    this.getInternacoes();
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
