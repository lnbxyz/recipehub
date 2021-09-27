import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionButtonComponent } from './interaction-button.component';

describe('InteractionButtonComponent', () => {
  let component: InteractionButtonComponent;
  let fixture: ComponentFixture<InteractionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
