import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasFormInscricoesComponent } from './vagas-form-inscricoes.component';

describe('VagasFormInscricoesComponent', () => {
  let component: VagasFormInscricoesComponent;
  let fixture: ComponentFixture<VagasFormInscricoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasFormInscricoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasFormInscricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
