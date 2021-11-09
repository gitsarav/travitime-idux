import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDaterangeComponent } from './field-daterange.component';

describe('FieldDaterangeComponent', () => {
  let component: FieldDaterangeComponent;
  let fixture: ComponentFixture<FieldDaterangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldDaterangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDaterangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
