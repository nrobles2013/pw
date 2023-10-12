export class Usuario {
  username:String;
  password:String;
  nombre:String;
  apellido:String;
  email?:String;
  telefono?:String;
  celular?:String;
  tpparticipe?:String;
  constructor(username: string, password: string,nombre : String,apellido: String,email:String,telefono:String,celular :String,tpparticipe:String) {
    this.username = username;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono= telefono;
    this.celular=celular;
    this.tpparticipe=tpparticipe
}
}
