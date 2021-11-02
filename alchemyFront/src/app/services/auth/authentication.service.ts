import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../util/user";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



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
        localStorage.setItem('user',JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        //add logic to save user for session
      } else {
        this.userData = null;
        localStorage.setItem('user', "");
        JSON.parse(localStorage.getItem('user')!);
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
        this.router.navigate(['profile']);
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
    const user = JSON.parse(localStorage.getItem('user')!);
    return((user !==null && user.emailVerified !==false) ?true : false);
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



  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}
