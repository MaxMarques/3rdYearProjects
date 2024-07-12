import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PornComponent } from './porn.component';

describe('PornComponent', () => {
  let component: PornComponent;
  let fixture: ComponentFixture<PornComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PornComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PornComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
