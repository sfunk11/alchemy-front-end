import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire//compat/firestore";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'; //installed in alchemyFront // command: ng add @angular/material // came with browser animation above
import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { PuzzleService } from './services/puzzle/puzzle.service';
import { PuzzleSelectorComponent } from './puzzle-selector/puzzle-selector.component';
import { PhotoDisplayComponent } from './photo-display/photo-display.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    BoardComponent,
    ProfileComponent,
    AdminComponent,
    PhotoUploadComponent,
    PuzzleSelectorComponent,
    PhotoDisplayComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSelectModule,
    MatFormFieldModule



  ],
  providers: [AuthenticationService, ApiService, PuzzleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
