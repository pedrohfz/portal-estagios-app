import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesListInscricoesComponent } from './estudantes-list-inscricoes.component';

describe('EstudantesListInscricoesComponent', () => {
  let component: EstudantesListInscricoesComponent;
  let fixture: ComponentFixture<EstudantesListInscricoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesListInscricoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesListInscricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
