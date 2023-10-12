import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Tipoparticipe } from "app/views/sessions/signin/Tipoparticipe.model";
import { Usuario } from 'app/shared/models/usuario.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  private messageChange = new Subject<string>;
  signupForm: UntypedFormGroup;
  errorMsg = '';
  usuario:Usuario;
  username:string;
  password:string;
  nombre:string;
  apellido:string;
  email:string;
  telefono:string="9999";
  celular:string="9999";
  agreed:boolean;
  idtipoparticipeSelected:string;
  tipoparticipeIndex:Tipoparticipe[];
  tipoparticipe: Tipoparticipe[] = [{'idparticipe':'1','descripcion':'Individual'},{'idparticipe':'2','descripcion':'Copropiedad'},{'idparticipe':'3','descripcion':'Sucesión'}];;




  private _unsubscribeAll: Subject<any>;


  constructor(
    private fb: UntypedFormBuilder,
    private jwtAuth: JwtAuthService,
    private egretLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this._unsubscribeAll = new Subject();

  }
  ejecuto(event){
    this.idtipoparticipeSelected=event.value
  }
  ngOnInit() {

    this.signupForm = new UntypedFormGroup({
      username: new UntypedFormControl(this.username, Validators.required),
      password: new UntypedFormControl(this.password, Validators.required),
      nombre: new UntypedFormControl(this.nombre, Validators.required),
      apellido: new UntypedFormControl(this.apellido, Validators.required),
      email: new UntypedFormControl(this.email, Validators.required),
      agreed: new UntypedFormControl(true),
      idtipoparticipeSelected: new UntypedFormControl(this.idtipoparticipeSelected, Validators.required),
    });
  }


  ngAfterViewInit() {
    //this.autoSignIn();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  signAdd() {

    if (this.signupForm.invalid) { return; }

    const signinData = this.signupForm.value;

    console.log(this.nombre+this.apellido)




    this.usuario = new Usuario(this.username,this.password,this.nombre,this.apellido,this.email,this.telefono,this.celular,this.idtipoparticipeSelected);
    this.jwtAuth.signadd(this.usuario).subscribe(
      (response) => {
        const helper = new JwtHelperService();
        console.log(response)
        let token = JSON.stringify(response);
        sessionStorage.setItem(this.jwtAuth.JWT_TOKEN, token);

        let tk = JSON.parse(sessionStorage.getItem(this.jwtAuth.JWT_TOKEN));
        const decodedToken = helper.decodeToken(tk.jwtToken);
        this.jwtAuth.JWT_TOKEN = tk.jwtToken;
        this.jwtAuth.user={'id': '5b700c45639d2c0c54b354ba',
        displayName: this.username,
        role: 'SA',
        usuario_id:0
        }
        this._snackBar.open("Accediendo", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        this.router.navigate(['/sessions/signin']);
      },
      (err) => {
        //this.submitButton.disabled = false;
       // this.progressBar.mode = 'determinate';
       this._snackBar.open("Verificar datos", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
      }
    );
 }

  autoSignIn() {
    if (this.jwtAuth.return === '/') {
      return;
    }
    this.egretLoader.open(
      `Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(
        0,
        20
      )}...`,
      { width: '320px' }
    );
    setTimeout(() => {
      this.signAdd();

      this.egretLoader.close();
    }, 2000);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
