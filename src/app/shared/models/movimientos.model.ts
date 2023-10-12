export class Movimientos {
  id:number;
  cpart:string;
  topera: string;
  fechadoc:Date;
  destipo:string;
  descrip:string;
  montomovi:Number;

      constructor(id:number,cpart:string,topera: string, fechadoc:Date,
        destipo:string,descrip:string,montomovi:number) {
             this.id=id
             this.cpart=cpart
             this.topera=topera
             this.fechadoc=fechadoc
             this.destipo=destipo
             this.descrip=descrip
             this.montomovi=montomovi

             }
}

