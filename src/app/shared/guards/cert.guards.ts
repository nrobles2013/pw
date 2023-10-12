import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import { MenuService } from '../services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { MenuUsuario } from '../models/menu.model';
import { map } from 'rxjs';


export const CertGuardsTsService = ( route : ActivatedRouteSnapshot, state: RouterStateSnapshot)=> {
    const router = inject(Router);
    const loginService = inject(JwtAuthService);
    const menuService = inject(MenuService);

    const rpta = loginService.islogin;
    console.log(rpta)
    if (!rpta){

      loginService.signout();
      return false ;
    }

    const helper = new JwtHelperService();
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    helper.isTokenExpired(token.access_token)
    if(!helper.isTokenExpired(token.access_token)){
      const url = state.url;
      console.log(url);
      const decodedToken = helper.decodeToken(token.access_token);
      const username = decodedToken.sub;
      return menuService.lista(new MenuUsuario( loginService.user.username,loginService.user.idtipoparticipe)).pipe(
        map((data:[])=>{
          let count = 0;
          console.log(data);
        }
      ))
    }else{
      console.log("acalastima")
      loginService.signout();
      return false ;
    }
}
