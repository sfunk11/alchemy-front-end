import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire//compat/firestore";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
<<<<<<< Updated upstream
import { AdminComponent } from './admin/admin.component';
=======
=======
>>>>>>> main
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'; //installed in alchemyFront // command: ng add @angular/material // came with browser animation above
import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> main


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
    BoardComponent,
    ProfileComponent,
>>>>>>> Stashed changes
=======
    BoardComponent,
    ProfileComponent,
>>>>>>> main
    AdminComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
>>>>>>> Stashed changes
=======
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
>>>>>>> main
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [AuthenticationService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
