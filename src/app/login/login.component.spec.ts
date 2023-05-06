import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, LoginFormComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        Title,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { title: 'Login | ANYWR' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create login Component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct page title', () => {
    expect(titleService.getTitle()).toBe('Login | ANYWR');
  });

  it('should submit the login form and make an API call', () => {
    const httpMock: HttpTestingController = TestBed.inject(
      HttpTestingController
    );
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const loginFormComponent: LoginFormComponent = fixture.debugElement.query(
      By.directive(LoginFormComponent)
    ).componentInstance;
    loginFormComponent.form.setValue({
      username: 'admin',
      password: 'Azerty@123',
    });

    const submitButton = fixture.nativeElement.querySelector(
      '.form-action button[type="submit"]'
    );
    expect(component.requesting).toBeFalsy();
    submitButton.click();

    fixture.detectChanges();

    expect(component.requesting).toBeTruthy();

    const req = httpMock.expectOne(
      'https://622faf62f113bfceed3eeb57.mockapi.io/api/v1/User?username=admin'
    );
    expect(req.request.method).toBe('GET');
    req.flush([{ username: 'admin', password: 'Azerty@123', id: '1' }]);

    const reqJWT = httpMock.expectOne('/tokens');
    expect(reqJWT.request.method).toBe('POST');
    reqJWT.flush({
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODMzNjgzODAxMzAsImV4cCI6MTY4MzM2ODUwMDEzMCwidXNlcklkIjoiMSJ9.Tmnx-uocCryQB5Q6lxa0wTwurQVG4IuhM8OroKmqbr0',
    });

    expect(component.requesting).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });
});
