import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from 'app/shared/shared-material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SessionsRoutes } from "./sessions.routing";
import { NotfoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { ContactoSoporteComponent } from './contacto-soporte/contacto-soporte.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    RouterModule.forChild(SessionsRoutes)
  ],
  declarations: [PasswordComponent,ForgotPasswordComponent, LockscreenComponent, SigninComponent, SignupComponent, NotfoundComponent, ErrorComponent, ContactoSoporteComponent]
})
export class SessionsModule { }
