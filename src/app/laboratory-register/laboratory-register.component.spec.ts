import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryRegisterComponent } from './laboratory-register.component';

describe('LaboratoryRegisterComponent', () => {
  let component: LaboratoryRegisterComponent;
  let fixture: ComponentFixture<LaboratoryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
