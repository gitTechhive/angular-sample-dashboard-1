/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthHeaderSignupComponent } from './auth-header-signup.component';

describe('AuthHeaderSignupComponent', () => {
  let component: AuthHeaderSignupComponent;
  let fixture: ComponentFixture<AuthHeaderSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthHeaderSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHeaderSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
