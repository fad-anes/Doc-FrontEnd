import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PofilePatientComponent } from './pofile-patient.component';

describe('PofilePatientComponent', () => {
  let component: PofilePatientComponent;
  let fixture: ComponentFixture<PofilePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PofilePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PofilePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
