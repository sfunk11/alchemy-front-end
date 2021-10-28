import {  NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let afAuth: AngularFireAuth;
  let afStore: AngularFirestore;
  let router: Router;



  const dummyUser = {
    uid: 'testUser',
    email:'test@email.com',
    displayName: 'User',
    photoURL: "test",
    emailVerified: true,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[AuthenticationService,
      AngularFireAuth, AngularFirestore,
      AngularFireModule,
      Router
      ]});
    AngularFireModule.initializeApp(environment.firebaseConfig)
    afAuth = TestBed.inject(AngularFireAuth),
    afStore = TestBed.inject(AngularFirestore)
    router = TestBed.inject(Router);


    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
