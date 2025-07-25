import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesFormComponent } from './estudantes-form.component';

describe('EstudantesFormComponent', () => {
  let component: EstudantesFormComponent;
  let fixture: ComponentFixture<EstudantesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
