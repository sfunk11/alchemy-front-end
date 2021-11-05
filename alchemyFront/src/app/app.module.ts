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
import { AuthenticationService } from './services/authentication.service';
import { RouterModule } from '@angular/router';
<<<<<<< Updated upstream
import { AdminComponent } from './admin/admin.component';
=======
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'; //installed in alchemyFront // command: ng add @angular/material // came with browser animation above
import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
<<<<<<< Updated upstream
=======
    BoardComponent,
    ProfileComponent,
>>>>>>> Stashed changes
    AdminComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< Updated upstream
=======
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
>>>>>>> Stashed changes
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
