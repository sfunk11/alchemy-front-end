import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthenticationService;

  class MockService{
    SignIn(email:string, password:string){}
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers:[{provide: AuthenticationService, useClass:MockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the SignIn() method', () => {
    let btn = fixture.debugElement.query(By.css(".btn")).nativeElement;
    btn.click();

    fixture.whenStable().then(() => {
      expect(component.authService.SignIn).toHaveBeenCalled();
    })
  });



});
