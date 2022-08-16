export class persona {
  idpersona?: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  provincia: string;
  pais: string;
  codigo_postal: number;
  fecha_nacimiento: Date;
  telefono: string;
  foto_perfil_url: string;

  constructor(
    nombre: string,
    apellido: string,
    descripcion: string,
    provincia: string,
    pais: string,
    codigo_postal: number,
    fecha_nacimiento: Date,
    telefono: string,
    foto_perfil_url: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.descripcion = descripcion;
    this.provincia = provincia;
    this.pais = pais;
    this.codigo_postal = codigo_postal;
    this.fecha_nacimiento = fecha_nacimiento;
    this.telefono = telefono;
    this.foto_perfil_url = foto_perfil_url;
  }
}
