import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginFormComponent } from './login-form.component';
import { SharedModule } from './../../../shared/shared.module';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create the login form component', () => {
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
    component.form.setValue({ username: 'testuser', password: 'Azerty@123' });

    expect(component.form.valid).toBeTruthy();
    expect(component.form.controls.username.valid).toBeTruthy();
    expect(component.form.controls.password.valid).toBeTruthy();
  });

  it('should mark the form as invalid when all fields are filled with invalid data', () => {
    component.form.setValue({ username: 'testuser', password: 'text' });

    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.username.valid).toBeTruthy();
    expect(component.form.controls.password.valid).toBeFalsy();
  });

  it('should navigate to signup page', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const signupButton = fixture.nativeElement.querySelector(
      '.form-action button[type="button"]'
    );
    signupButton.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith('/signup');
  });
});
