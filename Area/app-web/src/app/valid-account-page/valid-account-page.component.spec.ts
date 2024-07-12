import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidAccountPageComponent } from './valid-account-page.component';

describe('ValidAccountPageComponent', () => {
  let component: ValidAccountPageComponent;
  let fixture: ComponentFixture<ValidAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidAccountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
