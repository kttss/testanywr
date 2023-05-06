import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { SignupFormComponent } from './signup-form.component';
import { SignupRoutingModule } from '../../signup-routing.module';
import { SharedModule } from './../../../shared/shared.module';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SignupRoutingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should  signup fom component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid when form submission', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '.form-action button[type="submit"]'
    );
    submitButton.click();
    fixture.detectChanges();

    expect(component.form.touched).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  it('should mark the form as valid when all fields are filled with valid data', () => {
    component.form.setValue({
      username: 'testuser',
      password: 'Azerty@123',
      confirmpassword: 'Azerty@123',
      email: 'email@email.com',
    });

    expect(component.form.valid).toBeTruthy();
    expect(component.form.controls.username.valid).toBeTruthy();
    expect(component.form.controls.password.valid).toBeTruthy();
    expect(component.form.controls.confirmpassword.valid).toBeTruthy();
    expect(component.form.controls.email.valid).toBeTruthy();
  });

  it('should mark the form as invalid when all fields are filled with invalid data', () => {
    component.form.setValue({
      username: 'testuser',
      password: 'Azerty',
      confirmpassword: 'Az',
      email: 'email',
    });

    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.username.valid).toBeTruthy();
    expect(component.form.controls.password.valid).toBeFalsy();
    expect(component.form.controls.confirmpassword.valid).toBeFalsy();
    expect(component.form.controls.email.valid).toBeFalsy();
  });

  it('should navigate to login page', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const signupButton = fixture.nativeElement.querySelector(
      '.form-action button[type="button"]'
    );
    signupButton.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });
});
