import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listPersona: persona[] = new Array<persona>();
  constructor(public personaService: PersonaService) {}

  ngOnInit(): void {
    this.personaService.getListPersonas().subscribe((data) => {
      this.listPersona = data;
      console.log(this.listPersona);
    });
  }
}
