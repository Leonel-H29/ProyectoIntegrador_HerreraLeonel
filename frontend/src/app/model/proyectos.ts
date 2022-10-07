import { persona } from './persona.model';
export class Proyectos {
  idproyecto? : number;
  nombre : string;
  descripcion : string;
  fecha_inicio : Date;
  fecha_fin : Date;
  url_proyecto : string;
  persona : persona;

  constructor(
    nombre : string,
    descripcion : string,
    fecha_inicio : Date,
    fecha_fin : Date,
    url_proyecto : string,
    persona : persona
  ){
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.url_proyecto = url_proyecto;
    this.persona = persona;
  }
}
