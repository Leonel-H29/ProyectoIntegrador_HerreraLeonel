import { TokenService } from 'src/app/service/token.service';
import { PersonaService } from './../../service/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from './../../service/proyectos.service';
import { Proyectos } from './../../model/proyectos';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NewUser } from 'src/app/model/new-user';
import { persona } from './../../model/persona.model';
@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css'],
})
export class EditProyectosComponent implements OnInit, AfterViewInit {
  project: Proyectos = null;
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
  constructor(
    private proyService: ProyectosService,
    private persService: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private changeDet: ChangeDetectorRef
  ) {}

  isLogged = false;
  hasPermission = false;

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getPersona();
    this.getProyecto();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  getProyecto(): void {
    const id = this.activatedRouter.snapshot.params['idproy'];
    this.proyService.GetProyecto(id).subscribe(
      (data) => {
        this.project = data;
        this.project.persona = this.Persona;
        console.log('project: ', this.project);
      },
      (err) => {
        console.log('project: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['idproy'];
    //this.getPersona();
    this.proyService.UpdateProyecto(id, this.project).subscribe(
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
        this.Persona = data;
        //console.log(this.project);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
    //this.hasPermissions();
    this.persService
      .hasPermissions(idPersonaLogged, this.tokenService.getUsername())
      .subscribe((data) => (this.hasPermission = data));
    //this.hasPermissions();
    console.log(
      'Proyectos: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
  }
  /*
  hasPermissions(): void {
    this.persService
      .getPersonaByUsername(this.tokenService.getUsername())
      .subscribe(
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
  }*/
}
