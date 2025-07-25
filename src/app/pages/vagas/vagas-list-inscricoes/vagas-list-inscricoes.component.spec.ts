import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasListInscricoesComponent } from './vagas-list-inscricoes.component';

describe('VagasListInscricoesComponent', () => {
  let component: VagasListInscricoesComponent;
  let fixture: ComponentFixture<VagasListInscricoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasListInscricoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasListInscricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
