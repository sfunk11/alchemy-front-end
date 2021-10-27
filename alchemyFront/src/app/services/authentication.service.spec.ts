import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let afAuth: AngularFireAuth;
  let afStore: AngularFirestore;
  let router: Router;
  let ngZone: NgZone;

  const dummyUser = {
    uid: 'testUser',
    email:'test@email.com',
    displayName: 'User',
    photoURL: "test",
    emailVerified: true,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
