import { persona } from './persona.model';
export class HardSkills{
  idskill? : number;
  skill : string;
  persona : persona;

  constructor(
    skill : string,
    persona : persona
  ){
    this.skill = skill;
    this.persona = persona;
  }
}
