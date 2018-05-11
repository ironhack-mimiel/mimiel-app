import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePaymentsComponent } from './my-profile-payments.component';

describe('MyProfilePaymentsComponent', () => {
  let component: MyProfilePaymentsComponent;
  let fixture: ComponentFixture<MyProfilePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfilePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfilePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
