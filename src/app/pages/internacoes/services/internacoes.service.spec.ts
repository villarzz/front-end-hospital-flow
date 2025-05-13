/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { InternacoesService } from './internacoes.service';

describe('Service: Internacoes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternacoesService]
    });
  });

  it('should ...', inject([InternacoesService], (service: InternacoesService) => {
    expect(service).toBeTruthy();
  }));
});
