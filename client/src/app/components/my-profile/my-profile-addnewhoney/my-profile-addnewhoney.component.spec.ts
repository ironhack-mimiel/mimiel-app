import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileAddnewhoneyComponent } from './my-profile-addnewhoney.component';

describe('MyProfileAddnewhoneyComponent', () => {
  let component: MyProfileAddnewhoneyComponent;
  let fixture: ComponentFixture<MyProfileAddnewhoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileAddnewhoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileAddnewhoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
