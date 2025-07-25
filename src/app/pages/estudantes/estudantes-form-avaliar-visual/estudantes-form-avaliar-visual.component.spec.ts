import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesFormAvaliarVisualComponent } from './estudantes-form-avaliar-visual.component';

describe('EstudantesFormAvaliarVisualComponent', () => {
  let component: EstudantesFormAvaliarVisualComponent;
  let fixture: ComponentFixture<EstudantesFormAvaliarVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesFormAvaliarVisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesFormAvaliarVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
