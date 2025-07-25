import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesListComponent } from './estudantes-list.component';

describe('EstudantesListComponent', () => {
  let component: EstudantesListComponent;
  let fixture: ComponentFixture<EstudantesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
