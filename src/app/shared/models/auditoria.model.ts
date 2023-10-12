export class Auditoria {
  ip_maquina:string;
  usuario_id:number;
  username: string;
  descripcion:string;
  tpparticipe:string;
  cparticipe:string;
  fecha_registro:Date;




      constructor(ip_maquina:string,usuario_id:number,username: string, descripcion:string,
        tpparticipe:string,cparticipe:string,fecha_registro:Date) {
             this.ip_maquina=ip_maquina
             this.usuario_id=usuario_id
             this.username=username
             this.descripcion=descripcion
             this.tpparticipe=tpparticipe
             this.cparticipe=cparticipe
             this.fecha_registro=fecha_registro

             }
}

