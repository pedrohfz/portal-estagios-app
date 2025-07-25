import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesListAvaliarComponent } from './estudantes-list-avaliar.component';

describe('EstudantesListAvaliarComponent', () => {
  let component: EstudantesListAvaliarComponent;
  let fixture: ComponentFixture<EstudantesListAvaliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesListAvaliarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesListAvaliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
