import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStartGameComponent } from './dialog-start-game.component';

describe('DialogStartGameComponent', () => {
  let component: DialogStartGameComponent;
  let fixture: ComponentFixture<DialogStartGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStartGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
