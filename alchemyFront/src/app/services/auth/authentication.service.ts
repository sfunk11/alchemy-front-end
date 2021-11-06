import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../util/user";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { PuzzleService } from '../puzzle/puzzle.service';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private api: ApiService,
    private puzServ:PuzzleService )
    {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.userData= {
          uid:"",
          userID: 0,
          email: user.email,
          displayName: user.displayName,
          f_name: '',
          l_name: '',
          roleID: 0,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        }

      } else {
        this.userData = null;

      }
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      userID: 0,
      email: user.email,
      displayName: user.displayName,
      f_name: '',
      l_name: '',
      roleID: 0,
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
        this.api.getUserProfile(res.user!.email!).subscribe(
          res=> {
            this.userData.userID = res.userID;
            this.userData.displayName= res.displayName;
            this.userData.roleID = res.roleID;

          })
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
    if (this.userData == undefined || this.userData == null){
      return false;
    }else if(this.userData.emailVerified==false){
        return false;
      }

    return true;
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
      this.puzServ.puzzleName='';
      this.router.navigate(['sign-in']);
    })
  }
}
