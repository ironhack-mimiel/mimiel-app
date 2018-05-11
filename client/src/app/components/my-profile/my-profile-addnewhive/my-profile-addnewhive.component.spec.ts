import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileAddnewhiveComponent } from './my-profile-addnewhive.component';

describe('MyProfileAddnewhiveComponent', () => {
  let component: MyProfileAddnewhiveComponent;
  let fixture: ComponentFixture<MyProfileAddnewhiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileAddnewhiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileAddnewhiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
