import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../services/auth/authentication.service';

import { VerifyEmailComponent } from './verify-email.component';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let authService: AuthenticationService;

  class MockService{
    SendVerificationEmail(){};
  }

  beforeEach( () => {
      TestBed.configureTestingModule({
      declarations: [ VerifyEmailComponent ],
      providers:[{provide: AuthenticationService, useClass:MockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the SendVerificationEmail() method', () => {
    let btn = fixture.debugElement.query(By.css(".btn")).nativeElement;
    btn.click();

    fixture.whenStable().then(() => {
      expect(component.authService.SendVerificationEmail).toHaveBeenCalled();
    })
  });
});
