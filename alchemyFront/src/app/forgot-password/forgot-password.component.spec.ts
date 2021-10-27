import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: AuthenticationService;

  class MockService {
    ForgotPassword(email:string){}
  }

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers:[{provide: AuthenticationService, useClass: MockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the ForgotPassword() method', () => {
    let btn = fixture.debugElement.query(By.css(".btn")).nativeElement;
    btn.click();

    fixture.whenStable().then(() => {
      expect(component.authService.ForgotPassword).toHaveBeenCalled();
    })
  });
  it('should display alert when ForgotPassword() succeeds', () => {
    let authServiceSpy= spyOn(authService, 'ForgotPassword');
    let alertSpy = spyOn(window, 'alert');
    let btn = fixture.debugElement.query(By.css(".btn")).nativeElement;
    btn.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(window.alert).toHaveBeenCalledWith('message');
    })
  });

});
