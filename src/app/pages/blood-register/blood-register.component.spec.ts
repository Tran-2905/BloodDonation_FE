import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodRegisterComponent } from './blood-register.component';

describe('BloodRegisterComponent', () => {
  let component: BloodRegisterComponent;
  let fixture: ComponentFixture<BloodRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
