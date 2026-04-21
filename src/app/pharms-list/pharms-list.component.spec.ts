import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmsListComponent } from './pharms-list.component';

describe('PharmsListComponent', () => {
  let component: PharmsListComponent;
  let fixture: ComponentFixture<PharmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
