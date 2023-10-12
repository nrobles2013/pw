import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface UsuPass{
  usuario_id:string;
  correo:string;
  username:string;
}
interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[ ]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}


@Injectable()
export class NavigationService   implements OnInit{


  // este es donde van los itemns del menu
  plainMenu: IMenuItem[] =[]

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = '';
  // sets iconMenu as default;
  //menuItems = new BehaviorSubject<IMenuItem[]>(this.plainMenu);
  // navigation component has subscribed to this Observable
  //menuItems$ = this.menuItems.asObservable();



 getMenuData:any[]=[];
 getDataPass:any[]=[];


 private objectSourcePass = new BehaviorSubject<UsuPass[]>(this.getDataPass);

  $getObjectSourcePass = this.objectSourcePass.asObservable();

  dataPassItem=this.objectSourcePass
  dataPassItem$= this.$getObjectSourcePass



 private objectSource = new BehaviorSubject<IMenuItem[]>(this.getMenuData);

  $getObjectSource = this.objectSource.asObservable();

  menuItems=this.objectSource
  menuItems$= this.$getObjectSource

  constructor(    private jwtAuth: JwtAuthService,private router: Router
    ) {

  }
  ngOnInit(): void {

  }

// menu dinamico
  sendObjectSource(data:any[]){

    let ItemData = JSON.stringify(data);
    let tk = JSON.parse(ItemData);
    let datasql="[";
    let item=0

        for (let i = 0; i < tk.length; i++){
          item=item  + 1

          if (tk[i].menu.menuPad == tk[i].menu.menu_id  && tk[i].menu.flag=="1"){
            let hijosql="";
            let xcont=0;
            for (let hj = 0; hj < tk.length; hj++){

                if (tk[i].menu.menu_id==tk[hj].menu.menuPad && tk[hj].menu.menuPad != tk[hj].menu.menu_id && tk[hj].menu.flag=="1"){
                  xcont=xcont +1

                  if (xcont==1 ){
                      hijosql='"sub":[{"name":"'+tk[hj].menu.titleMenu+'","type":"link","icon":"'+tk[hj].menu.iconMenu+'","state":"'+tk[hj].menu.urlMenu+'"}'
                  }else{
                    hijosql=hijosql+',{"name":"'+tk[hj].menu.titleMenu+'","type":"link","icon":"'+tk[hj].menu.iconMenu+'","state":"'+tk[hj].menu.urlMenu+'"}'
                  }
                }
            }
            hijosql = hijosql+"]},";
            datasql=datasql+'{"name":"'+tk[i].menu.titleMenu+'","type":"dropDown","tooltip":"'+tk[i].menu.titleMenu+'","icon":"'+tk[i].menu.iconMenu+'","state":"'+tk[i].menu.titleMenu+'",'+hijosql
          }

          if (tk[i].menu.menuPad == tk[i].menu.menu_id  && tk[i].menu.flag=="0"){
            if  (item!=tk.length){
              datasql=datasql+'{"name":"'+tk[i].menu.titleMenu+'","type":"link","tooltip":"'+tk[i].menu.titleMenu+'","icon":"'+tk[i].menu.iconMenu+'","state":"'+tk[i].menu.urlMenu+'"},'
            }else{
              datasql=datasql+'{"name":"'+tk[i].menu.titleMenu+'","type":"link","tooltip":"'+tk[i].menu.titleMenu+'","icon":"'+tk[i].menu.iconMenu+'","state":"'+tk[i].menu.urlMenu+'"}'
            }

        }
      }

      datasql=datasql+"]"
      let json=JSON.parse(datasql);

    this.objectSource.next(json);
  }

  sendObjectSourcePass(data:any[]){
    this.objectSourcePass.next(data);
  }

  // FOLLOW THE EGRET FULL VERSION TO SEE HOW IT WORKS
  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {

    this.menuItems.next(this.plainMenu);
   //    switch (menuType) {
   //      case 'separator-menu':
   //        this.menuItems.next(this.separatorMenu);
   //        break;
   //      case 'icon-menu':
   //        this.menuItems.next(this.iconMenu);
   //        break;
   //      default:
   //        this.menuItems.next(this.plainMenu);
   //    }
  }
}
