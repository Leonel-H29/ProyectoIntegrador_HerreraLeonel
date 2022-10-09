import { HardSkills } from 'src/app/model/hard-skills';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { HardSkillService } from 'src/app/service/hard-skills.service';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';

@Component({
  selector: 'app-new-hard-skills',
  templateUrl: './new-hard-skills.component.html',
  styleUrls: ['./new-hard-skills.component.css']
})
export class NewHardSkillsComponent implements OnInit {
  Nskill: string = '';
  Nporcentaje: number = 0;
  NPersona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');


  constructor(
    private HsService : HardSkillService,
    private PersServ : PersonaService,
    private activatedRouter : ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.getPersona();
  }

  OnCreate() {
    const skill = new HardSkills(
      this.Nskill,
      this.Nporcentaje,
      this.NPersona
    );
    this.HsService.SaveHardSkills(skill).subscribe(
      (data) => {
        alert('Hard Skill añadida');
        console.log(data);
        this.router.navigate(['']);
      },
      (err) => {
        alert('Fallo la operacion');
        console.log(err);
        //this.router.navigate(['']);
      }
    );
  }


  getPersona(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    //this.Persona = this.PersServ.getPersona(id);
    this.PersServ.getPersona(id).subscribe(
      (data) => {
        this.NPersona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
  }

}
