import { persona } from './persona.model';
export class Educacion {
  ideducacion?: number;
  nombre_institucion: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  descripcion: string;
  persona: persona;

  constructor(
    nombre_institucion: string,
    fecha_inicio: Date,
    fecha_fin: Date,
    descripcion: string,
    persona: persona
  ){
    this.nombre_institucion =  nombre_institucion;
    this.fecha_inicio =  fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.descripcion = descripcion;
    this.persona = persona;
  }
}
