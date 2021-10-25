import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "./user";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { auth } from 'angularfire2/node_modules/firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone )
    {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.userData = user;
        //add logic to save user for session
      } else {
        this.userData = null;
        //add logic to clear user for session
      }
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SendVerificationEmail(){
    return this.afAuth.currentUser
      .then(user => user!.sendEmailVerification())
      .then(()=> {
        this.router.navigate(['verify-email-address']);
      })
  }

  SignIn(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email,password)
      .then((res) => {
        this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
        });
        this.SetUserData(res.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email:string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {

        this.SendVerificationEmail();
        this.SetUserData(res.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  ForgotPassword(passwordResetEmail:string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  get isLoggedIn(): boolean {
    const user = this.userData;
    return((user !==null && this.userData.emailVerified !==false) ?true : false);
  }

  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((res) => {
      this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(res.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
     //set logic to remove user from state
      this.router.navigate(['sign-in']);
    })
  }
}
