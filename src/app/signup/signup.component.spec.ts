import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Title, By } from '@angular/platform-browser';

import { SignupComponent } from './signup.component';
import { SharedModule } from '../shared/shared.module';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent, SignupFormComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        Title,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { title: 'Signup | ANYWR' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create signup component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct page title', () => {
    expect(titleService.getTitle()).toBe('Signup | ANYWR');
  });

  it('should submit the signup form and make an API call', () => {
    const httpMock: HttpTestingController = TestBed.inject(
      HttpTestingController
    );
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const signupFormComponent: SignupFormComponent = fixture.debugElement.query(
      By.directive(SignupFormComponent)
    ).componentInstance;
    signupFormComponent.form.setValue({
      username: 'testuser',
      password: 'Azerty@123',
      confirmpassword: 'Azerty@123',
      email: 'email@email.com',
    });

    const submitButton = fixture.nativeElement.querySelector(
      '.form-action button[type="submit"]'
    );
    expect(component.requesting).toBeFalsy();
    submitButton.click();

    fixture.detectChanges();

    expect(component.requesting).toBeTruthy();

    const req = httpMock.expectOne(
      'https://622faf62f113bfceed3eeb57.mockapi.io/api/v1/User'
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(component.requesting).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });
});
