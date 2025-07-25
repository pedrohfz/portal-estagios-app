import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesFormAvaliarComponent } from './estudantes-form-avaliar.component';

describe('EstudantesFormAvaliarComponent', () => {
  let component: EstudantesFormAvaliarComponent;
  let fixture: ComponentFixture<EstudantesFormAvaliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesFormAvaliarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesFormAvaliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
