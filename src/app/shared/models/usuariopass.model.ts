export class Usuariopass {
  usuario_id:number;
  username:String;
  password:String;
  email?:String;
  codigover:String;

  constructor(usuario_id:number,username: string, password: string,email:String,codigover:String) {
    this.usuario_id=usuario_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.codigover=codigover;
}
}
