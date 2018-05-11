import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileBillingComponent } from './my-profile-billing.component';

describe('MyProfileBillingComponent', () => {
  let component: MyProfileBillingComponent;
  let fixture: ComponentFixture<MyProfileBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
