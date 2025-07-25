import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasFormVisualizarComponent } from './vagas-form-visualizar.component';

describe('VagasFormVisualizarComponent', () => {
  let component: VagasFormVisualizarComponent;
  let fixture: ComponentFixture<VagasFormVisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasFormVisualizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasFormVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
