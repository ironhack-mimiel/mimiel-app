import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillDetailsFormComponent } from './fill-details-form.component';

describe('FillDetailsFormComponent', () => {
  let component: FillDetailsFormComponent;
  let fixture: ComponentFixture<FillDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
