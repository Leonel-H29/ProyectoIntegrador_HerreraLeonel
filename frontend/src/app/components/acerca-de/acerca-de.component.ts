import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  persona: persona = new persona(
    '',
    '',
    '',
    '',
    '',
    '',
    0,
    new Date(),
    '',
    '',
    new NewUser()
  );

  constructor(
    public personaService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private imgServ: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.getPersona(id).subscribe((data) => {
      this.persona = data;
      this.persona.foto_perfil_url = this.imgServ.fetchImage(
        this.persona.foto_perfil_url
      );
      //console.log(this.persona);
    });
  }
}
