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
@Component({
  selector: 'app-edit-hard-skills',
  templateUrl: './edit-hard-skills.component.html',
  styleUrls: ['./edit-hard-skills.component.css'],
})
export class EditHardSkillsComponent implements OnInit, AfterViewInit {
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
        //this.getPersona();
        console.log('HS: ', this.hardS);
        if (this.hardS.persona.apellido.length == 0) {
          window.location.reload();
        }
      },
      (err) => {
        console.log('HS: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        window.location.reload();
      }
    );
  }

  onUpdate(): void {
    this.IsLoadding = true;
    const id = this.activatedRouter.snapshot.params['idhs'];
    //this.getPersona();
    this.hardSServ.UpdateHardSkills(id, this.hardS).subscribe(
      (data) => {
        alert('Registro modificado');
        this.router.navigate([
          'perfil/' + this.activatedRouter.snapshot.params['idper'],
        ]);
      },
      (err) => {
        this.IsLoadding = false;
        alert('Error al modificar el registro');

        const ruta =
          'ediths/' + this.activatedRouter.snapshot.params['idper'] + '/' + id;
        this.router.navigate([ruta]);
      }
    );
  }

  getPersona(): void {
    const idPersonaLogged = this.activatedRouter.snapshot.params['idper'];

    this.persService.getPersona(idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.project);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
        window.location.reload();
      }
    );
    this.persService
      .hasPermissions(idPersonaLogged, this.tokenService.getUsername())
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
