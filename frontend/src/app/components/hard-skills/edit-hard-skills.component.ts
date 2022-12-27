import { TokenService } from './../../service/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from './../../service/persona.service';
import { HardSkills } from './../../model/hard-skills';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { HardSkillService } from 'src/app/service/hard-skills.service';
import { NewUser } from 'src/app/model/new-user';
import { persona } from './../../model/persona.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-hard-skills',
  templateUrl: './edit-hard-skills.component.html',
  styleUrls: ['./edit-hard-skills.component.css'],
})
export class EditHardSkillsComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['idper'];
  idHSEdit: number = this.activatedRouter.snapshot.params['idhs'];
  hardS: HardSkills = null;
  Persona: persona = new persona(
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
  IsLoadding = false;
  constructor(
    private hardSServ: HardSkillService,
    private persService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService,
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
    this.getHardSkill();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  getHardSkill(): void {
    const id = this.activatedRouter.snapshot.params['idhs'];
    this.hardSServ.GetHardSkills(id).subscribe(
      (data) => {
        this.hardS = data;
        this.hardS.persona = this.Persona;
        //console.log('HS: ', this.hardS);
        if (this.hardS.persona.apellido.length == 0) {
          window.location.reload();
        }
      },
      (err) => {
        //console.log('HS: ', null);
        //alert('Error al modificar el registro');
        Swal.fire(
          'Error al modificar el registro',
          'Volver al inicio',
          'error'
        );
        console.log('Error: ', err);
        this.router.navigate(['']);
        //window.location.reload();
      }
    );
  }

  onUpdate(): void {
    this.IsLoadding = true;

    this.hardSServ.UpdateHardSkills(this.idHSEdit, this.hardS).subscribe(
      (data) => {
        //alert('Registro modificado');
        Swal.fire('Registro modificado', 'Press Ok', 'success');
        this.router.navigate(['perfil/' + this.idPersonaLogged]);
      },
      (err) => {
        this.IsLoadding = false;
        //alert('Error al modificar el registro');
        Swal.fire(
          'Error al modificar el registro',
          'Vuelva a intentarlo',
          'error'
        );
        const ruta = 'ediths/' + this.idPersonaLogged + '/' + this.idHSEdit;
        this.router.navigate([ruta]);
      }
    );
  }

  getPersona(): void {
    this.persService.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
      },
      (err) => {
        Swal.fire(
          'No se pudo encontrar a la persona',
          'Volver al perfil',
          'error'
        );
        this.router.navigate(['/perfil/' + this.idPersonaLogged]);
        //alert('No se pudo encontrar a la persona');
      }
    );
    this.persService
      .hasPermissions(this.idPersonaLogged, this.tokenService.getUsername())
      .subscribe((data) => (this.hasPermission = data));
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
