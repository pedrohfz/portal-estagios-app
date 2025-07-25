import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasFormComponent } from './empresas-form.component';

describe('EmpresasFormComponent', () => {
  let component: EmpresasFormComponent;
  let fixture: ComponentFixture<EmpresasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
