import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from './../../service/persona.service';
import { HardSkills } from './../../model/hard-skills';
import { Component, OnInit } from '@angular/core';
import { HardSkillService } from 'src/app/service/hard-skills.service';

@Component({
  selector: 'app-edit-hard-skills',
  templateUrl: './edit-hard-skills.component.html',
  styleUrls: ['./edit-hard-skills.component.css'],
})
export class EditHardSkillsComponent implements OnInit {
  hardS: HardSkills = null;
  constructor(
    private hardSServ: HardSkillService,
    private persService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['idhs'];
    this.hardSServ.GetHardSkills(id).subscribe(
      (data) => {
        this.hardS = data;
        this.getPersona();
        console.log('HS: ', this.hardS);
      },
      (err) => {
        console.log('HS: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['idhs'];
    //this.getPersona();
    this.hardSServ.UpdateHardSkills(id, this.hardS).subscribe(
      (data) => {
        alert('Registro modificado');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al modificar el registro');
        //this.router.navigate(['']);
      }
    );
  }

  getPersona(): void {
    const idPersonaLogged = this.activatedRouter.snapshot.params['idper'];

    this.persService.getPersona(idPersonaLogged).subscribe(
      (data) => {
        this.hardS.persona = data;
        //console.log(this.project);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
  }
}
