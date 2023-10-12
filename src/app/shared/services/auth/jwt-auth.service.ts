import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { Usuario } from "../../models/usuario.model";
import { Observable } from 'rxjs';

import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";
import { AuditoriaService } from "../auditoria.service";
import { Auditoria } from "app/shared/models/auditoria.model";
import { Correo } from "app/shared/models/correo.model";
import { Usuariopass } from '../../models/usuariopass.model';

// ================= only for demo purpose ===========
const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";
/*
const DEMO_USER: User = {
  id: "5b700c45639d2c0c54b354ba",
  displayName: "Watson Joyce",
  role: "SA",
};
*/
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  private url=`${environment.apiURLKC}/realms/popularsafi/protocol/openid-connect/token`
  token;
  isAuthenticated: Boolean;
  user: User =  {
    id: "5b700c45639d2c0c54b354ba",
    displayName: "Watson Joyce",
    role:'SA',
    username:'10348298',
    cparticipe:'99999',
    usuario_id:0,
    idtipoparticipe :'',
    correo:"",
    pass:"",
  };
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  return: string;
  islogin:Boolean;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "EGRET_USER";
  fondo:String;
  desfondo:String;
  idtipoparticipe : String;
  descripcion :String;
  auditoria:Auditoria;
  miip:string;


  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private auditoriaService:AuditoriaService,
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }



  public traerIP(){
    return this.http.get<any>( "https://api.ipify.org/?format=json")

 }

  public signin(username, password,tipoparticipe) {
    this.signingIn = true;
     const body=`client_id=appsafimovil&client_secret=KmDdV3POdC8jwyVK9JzqyzW0YyO67vTH&grant_type=password&username=${username}&password=${password}`;
     return this.http.post<any>(this.url ,body, {
      headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
      })
  }


  public signadd(data: Usuario) : Observable<any>{

    this.signingIn = true;
    return this.http.post<any>(`${environment.apiURL}/tokens/user/add` ,  data )

 }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    return of(this.user)
      .pipe(
        map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), profile, true);
          this.signingIn = false;
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );

    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */

    // return this.http.get(`${environment.apiURL}/api/users/profile`)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       this.signout();
    //       return of(error);
    //     })
    //   );
  }

  public signout() {
    this.traerIP().subscribe(data=>{
      let date: Date = new Date();
      let ip= JSON.stringify(data.ip);
      this.miip=ip
      this.auditoria = new Auditoria( this.miip, this.user.usuario_id,this.user.username,"Saliendo del sistema",this.user.idtipoparticipe,this.user.cparticipe,date)
      this.setUserAndToken(null, null, false);
      this.auditoriaService.insertar(this.auditoria).subscribe((data)=>{
        this.islogin=false
        this.router.navigateByUrl("sessions/signin");
      }
      )}, (err) => {
        this.router.navigateByUrl("sessions/signin");
        this.islogin=false
      })
      this.router.navigateByUrl("sessions/signin");
      this.islogin=false
  }

  public reseteo(correo:Correo): Observable<any>{
    return this.http.post<any>(`${environment.apiURL}/tokens/user/reseteo` , correo  )
  }


  public actualizapass(usuario:Usuariopass): Observable<any>{
    return this.http.post<any>(`${environment.apiURL}/tokens/user/actualizausu` , usuario  )
  }

  public permisousu(usuario:Usuario): Observable<any>{
    return this.http.post<any>(`${environment.apiURL}/tokens/user/actualizapermiso` , usuario  )
  }

  public listapermiso(usuario:Usuario): Observable<any>{
    return this.http.post<any>(`${environment.apiURL}/tokens/user/numeropermiso` , usuario  )
  }

  public permisobloq(usuario:Usuario): Observable<any>{
    return this.http.post<any>(`${environment.apiURL}/tokens/user/notificacionbloqueo` , usuario  )
  }

  isLoggedIn(dato:Boolean) {
    this.islogin = dato;
    return dato;
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }

  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }

}
