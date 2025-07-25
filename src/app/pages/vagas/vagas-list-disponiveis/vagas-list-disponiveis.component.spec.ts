import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasListDisponiveisComponent } from './vagas-list-disponiveis.component';

describe('VagasListDisponiveisComponent', () => {
  let component: VagasListDisponiveisComponent;
  let fixture: ComponentFixture<VagasListDisponiveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasListDisponiveisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasListDisponiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
