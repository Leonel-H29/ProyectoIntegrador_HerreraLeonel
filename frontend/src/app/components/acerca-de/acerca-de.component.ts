import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  //persona: persona = new persona('', '', '', '', '', 0, new Date(), '', '', '');
  persona!: persona;

  constructor(
    public personaService: PersonaService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.getPersona(id).subscribe((data) => {
      this.persona = data;
      console.log(this.persona);
    });
  }
}
