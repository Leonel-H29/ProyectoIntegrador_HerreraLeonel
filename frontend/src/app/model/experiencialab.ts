import { persona } from './persona.model';
import { TipoEmpleo } from './tipo-empleo';

export class Experiencialab {
  idexperiencia?: number;
  nombre_empresa: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  descripcion: string;
  //idpersona: number;
  //idtipo_empleo: number;
  persona: persona;
  tipoEmpleo: TipoEmpleo;

  constructor(
    nombre_empresa: string,
    fecha_inicio: Date,
    fecha_fin: Date,
    descripcion: string,
    //idpersona: number,
    //idtipo_empleo: number
    persona: persona,
    tipoEmpleo: TipoEmpleo
  ) {
    this.nombre_empresa = nombre_empresa;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.descripcion = descripcion;
    //this.idpersona = idpersona;
    //this.idtipo_empleo = idtipo_empleo;
    this.persona = persona;
    this.tipoEmpleo = tipoEmpleo;
  }
}
