import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasFormPublicComponent } from './empresas-form-public.component';

describe('EmpresasFormPublicComponent', () => {
  let component: EmpresasFormPublicComponent;
  let fixture: ComponentFixture<EmpresasFormPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasFormPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasFormPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
