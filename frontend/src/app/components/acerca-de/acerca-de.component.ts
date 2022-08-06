import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  //persona: persona = new persona('', '', '', '', '', 0, new Date(), '', '', '');
  listPersona: persona[] = new Array<persona>();
  constructor(public personaService: PersonaService) {}

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe((data) => {
      this.listPersona = data;
      console.log(this.listPersona);
    });
  }
}
