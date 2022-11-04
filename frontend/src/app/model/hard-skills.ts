import { persona } from './persona.model';
export class HardSkills{
  idskill? : number;
  skill : string;
  porcentaje : number;
  persona : persona;

  constructor(
    skill : string,
    porcentaje : number,
    persona : persona
  ){
    this.skill = skill;
    this.porcentaje = porcentaje;
    this.persona = persona;
  }
}
