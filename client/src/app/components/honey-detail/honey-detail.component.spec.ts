import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoneyDetailComponent } from './honey-detail.component';

describe('HoneyDetailComponent', () => {
  let component: HoneyDetailComponent;
  let fixture: ComponentFixture<HoneyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoneyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoneyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
