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

@Component({
  selector: 'app-new-hard-skills',
  templateUrl: './new-hard-skills.component.html',
  styleUrls: ['./new-hard-skills.component.css'],
})
export class NewHardSkillsComponent implements OnInit, AfterViewInit {
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
        alert('Hard Skill añadida');
        console.log(data);
        this.router.navigate([
          'perfil/' + this.activatedRouter.snapshot.params['id'],
        ]);
      },
      (err) => {
        this.IsLoadding = false;
        alert('Fallo la operacion');
        console.log(err);
        this.router.navigate([
          'createhs/' + this.activatedRouter.snapshot.params['id'],
        ]);
      }
    );
  }

  getPersona(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.PersServ.getPersona(id).subscribe(
      (data) => {
        this.NPersona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
    this.PersServ.hasPermissions(id, this.tokenService.getUsername()).subscribe(
      (data) => (this.hasPermission = data)
    );
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
