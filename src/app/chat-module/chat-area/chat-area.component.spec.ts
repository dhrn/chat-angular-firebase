import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAreaComponent } from './chat-area.component';

describe('ChatAreaComponent', () => {
  let component: ChatAreaComponent;
  let fixture: ComponentFixture<ChatAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
