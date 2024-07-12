import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarBisComponent } from './tool-bar-bis.component';

describe('ToolBarComponent', () => {
  let component: ToolBarBisComponent;
  let fixture: ComponentFixture<ToolBarBisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBarBisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
