import { NewUser } from './new-user';
export class persona {
  idpersona?: number;
  nombre: string;
  apellido: string;
  profesion: string;
  descripcion: string;
  provincia: string;
  pais: string;
  codigo_postal: number;
  fecha_nacimiento: Date;
  telefono: string;
  foto_perfil_url: string;
  usuario: NewUser;

  constructor(
    nombre: string,
    apellido: string,
    profesion: string,
    descripcion: string,
    provincia: string,
    pais: string,
    codigo_postal: number,
    fecha_nacimiento: Date,
    telefono: string,
    foto_perfil_url: string,
    usuario: NewUser
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.profesion = profesion;
    this.descripcion = descripcion;
    this.provincia = provincia;
    this.pais = pais;
    this.codigo_postal = codigo_postal;
    this.fecha_nacimiento = fecha_nacimiento;
    this.telefono = telefono;
    this.foto_perfil_url = foto_perfil_url;
    this.usuario = usuario;
  }
}
