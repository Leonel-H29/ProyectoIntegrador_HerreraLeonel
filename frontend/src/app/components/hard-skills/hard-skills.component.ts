import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { HardSkills } from 'src/app/model/hard-skills';
import { HardSkillService } from 'src/app/service/hard-skills.service';
import { persona } from 'src/app/model/persona.model';

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css'],
})
export class HardSkillsComponent implements OnInit {
  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  skill: HardSkills[] = [];
  HardSkillsAeliminar: HardSkills;
  Persona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');

  constructor(
    private skillService: HardSkillService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router
  ) {}

  isLogged = false;

  ngOnInit(): void {
    this.getPersona();
    ///console.log('Id Persona: ', this.idPersonaLogged);
    //console.log('Persona: ', this.Persona);
    this.CargarHardSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  CargarHardSkills(): void {
    this.skillService.ListaHardSkills().subscribe(
      (data) => {
        /*
        data.forEach((element) => {
          console.log(element);
          if (element.HardSkills.idHardSkills == this.HardSkills.idHardSkills) {
            this.expe.push(element);
          }
        });
        */
        this.skill = data;
        console.log('HardSkills: ', this.skill);
      },
      (err) => {
        alert('Se encontro un error en la lista');
        //console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  DeleteHardSkills(id?: number) {
    if (id != undefined) {
      this.skillService.DeleteHardSkills(id).subscribe(
        (data) => {
          alert('Se elimino la Hard & Soft Skill');
          this.CargarHardSkills();
          this.router.navigate(['']);
        },
        (err) => {
          alert('No se ha podido eliminar la HardSkills');
        }
      );
    }
  }

  getHardSkillsAEliminar(HardSkills: HardSkills): void {
    this.HardSkillsAeliminar = HardSkills;
  }

  getPersona(): void {
    this.idPersonaLogged = this.activatedRouter.snapshot.params['id'];
    this.GetidPersona.emit(this.idPersonaLogged);

    this.PersServ.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        this.router.navigate(['']);
      }
    );
  }
}
