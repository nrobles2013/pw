
import { Routes } from "@angular/router";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { NotfoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";
import { ContactoSoporteComponent } from "./contacto-soporte/contacto-soporte.component";
import { InversionComponent } from "../reporte/inversion/inversion.component";
import { PasswordComponent } from "./password/password.component";


export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "signup",
        component: SignupComponent,
        data: { title: "Signup" }
      },
      {
        path: "signin",
        component: SigninComponent,
        data: { title: "Signin" }
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        data: { title: "Forgot password" }
      },   {
        path: "password",
        component:PasswordComponent,
        data: { title: "password" }
      },
      {
        path: "lockscreen",
        component: LockscreenComponent,
        data: { title: "Lockscreen" }
      },
     {
        path: "404",
        component: NotfoundComponent,
        data: { title: "Not Found" }
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { title: "Error" }
      },
      {
        path: "contacto",
        component: ContactoSoporteComponent,
        data: { title: "Contacto" }
      }
    ]
  }
];
