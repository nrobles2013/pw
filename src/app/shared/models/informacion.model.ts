export class Informacion {
  id:number;
  documento:string;
  fecha:Date;
  ruta:string;

      constructor(id:number,documento:string,fecha:Date,ruta: string) {
             this.documento=documento
             this.fecha=fecha
             this.ruta=ruta
        }
}

