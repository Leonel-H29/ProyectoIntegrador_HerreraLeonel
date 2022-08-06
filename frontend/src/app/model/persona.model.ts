export class persona {
  idpersona?: number;
  nombre: String;
  apellido: String;
  descripcion: String;
  provincia: String;
  pais: String;
  codigo_postal: number;
  fecha_nacimiento: Date;
  telefono: String;
  correo: String;
  foto_perfil_url: String;

  constructor(
    nombre: String,
    apellido: String,
    descripcion: String,
    provincia: String,
    pais: String,
    codigo_postal: number,
    fecha_nacimiento: Date,
    telefono: String,
    correo: String,
    foto_perfil_url: String
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.descripcion = descripcion;
    this.provincia = provincia;
    this.pais = pais;
    this.codigo_postal = codigo_postal;
    this.fecha_nacimiento = fecha_nacimiento;
    this.telefono = telefono;
    this.correo = correo;
    this.foto_perfil_url = foto_perfil_url;
  }
}
