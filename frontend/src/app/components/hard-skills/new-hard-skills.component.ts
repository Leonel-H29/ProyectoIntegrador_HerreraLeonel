import { TokenService } from './../../service/token.service';
import { HardSkills } from 'src/app/model/hard-skills';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { HardSkillService } from 'src/app/service/hard-skills.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-hard-skills',
  templateUrl: './new-hard-skills.component.html',
  styleUrls: ['./new-hard-skills.component.css'],
})
export class NewHardSkillsComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
  Nskill: string = '';
  Nporcentaje: number = 0;
  NPersona: persona = new persona(
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
  isLogged = false;
  hasPermission = false;
  IsLoadding = false;

  constructor(
    private HsService: HardSkillService,
    private PersServ: PersonaService,
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
    private changeDet: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }
  ngOnInit(): void {
    this.getPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  OnCreate() {
    this.IsLoadding = true;
    const skill = new HardSkills(this.Nskill, this.Nporcentaje, this.NPersona);
    this.HsService.SaveHardSkills(skill).subscribe(
      (data) => {
        //alert('Hard Skill añadida');
        Swal.fire('Hard Skill añadida', 'Press Ok', 'success');
        console.log(data);
        this.router.navigate(['perfil/' + this.idPersonaLogged]);
      },
      (err) => {
        this.IsLoadding = false;
        //alert('Fallo la operacion');
        console.log(err);
        Swal.fire('Fallo la operacion', 'Vuelva a intentarlo', 'error');
        this.router.navigate(['createhs/' + this.idPersonaLogged]);
      }
    );
  }

  getPersona(): void {
    this.PersServ.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.NPersona = data;
        //console.log(this.Persona);
      },
      (err) => {
        //alert('No se pudo encontrar a la persona');
        Swal.fire(
          'No se pudo encontrar a la persona',
          'Volver al perfil',
          'error'
        );
        this.router.navigate(['/perfil/' + this.idPersonaLogged]);
      }
    );
    this.PersServ.hasPermissions(
      this.idPersonaLogged,
      this.tokenService.getUsername()
    ).subscribe((data) => (this.hasPermission = data));
    /*
    console.log(
      'Hard Skill: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }
}
