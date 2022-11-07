import { persona } from './persona.model';

export class Redes {
  idred?: number;
  red: string;
  url_red: string;
  persona: persona;

  constructor(red: string, url_red: string, persona: persona) {
    this.red = red;
    this.url_red = url_red;
    this.persona = persona;
  }
}
