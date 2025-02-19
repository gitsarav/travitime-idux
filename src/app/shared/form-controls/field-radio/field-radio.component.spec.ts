import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRadioComponent } from './field-radio.component';

describe('FieldRadioComponent', () => {
  let component: FieldRadioComponent;
  let fixture: ComponentFixture<FieldRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
