import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../services/auth/authentication.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthenticationService;

  class MockService{
    SignUp(email:string, password:string){}
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      providers:[{provide: AuthenticationService, useClass:MockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the SignUp() method', () => {
    let btn = fixture.debugElement.query(By.css(".btn")).nativeElement;
    btn.click();

    fixture.whenStable().then(() => {
      expect(component.authService.SignUp).toHaveBeenCalled();
    })
  });
});
