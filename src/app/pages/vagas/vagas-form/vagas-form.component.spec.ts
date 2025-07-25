import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasFormComponent } from './vagas-form.component';

describe('VagasFormComponent', () => {
  let component: VagasFormComponent;
  let fixture: ComponentFixture<VagasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
