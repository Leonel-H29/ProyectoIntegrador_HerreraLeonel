export class Experiencialab {
  id?: number;
  nombre_empresa: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  descripcion: string;
  idpersona: number;
  idtipo_empleo: number;

  constructor(
    nombre_empresa: string,
    fecha_inicio: Date,
    fecha_fin: Date,
    descripcion: string,
    idpersona: number,
    idtipo_empleo: number
  ) {
    this.nombre_empresa = nombre_empresa;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.descripcion = descripcion;
    this.idpersona = idpersona;
    this.idtipo_empleo = idtipo_empleo;
  }
}
