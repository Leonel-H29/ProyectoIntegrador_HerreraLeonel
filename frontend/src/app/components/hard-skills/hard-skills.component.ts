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
import Swal from 'sweetalert2';

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

    this.CargarHardSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.PersServ.hasPermissions(
        this.idPersonaLogged,
        this.tokenService.getUsername()
      ).subscribe((data) => (this.hasPermission = data));
    }
    /*
    console.log(
      'Hard Skill: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }

  CargarHardSkills(): void {
    this.skillService.ListaHardSkillsByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.skill = data;
        //console.log('HardSkills: ', this.skill);
      },
      (err) => {
        Swal.fire(
          'Se encontro un error en la lista',
          'Volver al inicio',
          'error'
        );

        //alert('Se encontro un error en la lista');
        //console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  DeleteHardSkills(id?: number) {
    if (id != undefined) {
      this.skillService.DeleteHardSkills(id).subscribe(
        (data) => {
          Swal.fire('Se elimino la Hard & Soft Skill', 'Press Ok', 'success');
          //alert('Se elimino la Hard & Soft Skill');

          window.location.reload();
          this.router.navigate(['/perfil/' + this.idPersonaLogged]);
          //this.CargarHardSkills();
        },
        (err) => {
          //alert('No se ha podido eliminar la HardSkills');
          Swal.fire(
            'No se ha podido eliminar la Hard & Soft Skill',
            'Volver a intertarlo',
            'error'
          );
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
        //alert('No se pudo encontrar a la persona');
        Swal.fire(
          'No se pudo encontrar a la persona',
          'Volver al inicio',
          'error'
        );
        this.router.navigate(['']);
      }
    );
  }
}
