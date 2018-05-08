import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoneyListComponent } from './honey-list.component';

describe('HoneyListComponent', () => {
  let component: HoneyListComponent;
  let fixture: ComponentFixture<HoneyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoneyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoneyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
