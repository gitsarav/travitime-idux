import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IduxChatBoxComponent } from './idux-chat-box.component';

describe('IduxChatBoxComponent', () => {
  let component: IduxChatBoxComponent;
  let fixture: ComponentFixture<IduxChatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IduxChatBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IduxChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
