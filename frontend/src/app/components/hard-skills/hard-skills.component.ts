import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { HardSkills } from 'src/app/model/hard-skills';
import { HardSkillService } from 'src/app/service/hard-skills.service';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css'],
})
export class HardSkillsComponent implements OnInit, AfterViewInit {
  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  skill: HardSkills[] = [];
  HardSkillsAeliminar: HardSkills;
  Persona: persona = new persona(
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
    private skillService: HardSkillService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router,
    private changeDet: ChangeDetectorRef
  ) {}

  isLogged = false;
  hasPermission = false;

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getPersona();
    ///console.log('Id Persona: ', this.idPersonaLogged);
    //console.log('Persona: ', this.Persona);
    this.CargarHardSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.PersServ.hasPermissions(
        this.idPersonaLogged,
        this.tokenService.getUsername()
      ).subscribe((data) => (this.hasPermission = data));
    }
    console.log(
      'Hard Skill: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
  }

  CargarHardSkills(): void {
    this.skillService.ListaHardSkillsByPersona(this.idPersonaLogged).subscribe(
      (data) => {
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
    this.hasPermissions();
  }

  hasPermissions(): void {
    this.PersServ.getPersonaByUsername(
      this.tokenService.getUsername()
    ).subscribe(
      (data) => {
        if (data.idpersona == this.Persona.idpersona) {
          this.hasPermission = true;
        }
        //return 'false';
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
  }
}
