import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternacoesComponent } from './internacoes.component';

describe('InternacoesComponent', () => {
  let component: InternacoesComponent;
  let fixture: ComponentFixture<InternacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
