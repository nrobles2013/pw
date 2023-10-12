import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface usuariodatos{
  usuario_id:string;
  email:string;
  username:string;
}

@Injectable()
export class PasswordService {

  getUserData:any[]=[];

  private objectSource = new BehaviorSubject<usuariodatos[]>(this.getUserData);

   $getObjectSource = this.objectSource.asObservable();

   menuItems=this.objectSource
   menuItems$= this.$getObjectSource

   constructor(   private router: Router
     ) {

   }
   ngOnInit(): void {

   }

 // menu dinamico
   sendObjectSource(data:any[]){

     this.objectSource.next(data);
   }



}
