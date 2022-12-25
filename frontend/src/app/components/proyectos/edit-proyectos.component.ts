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
  IsLoadding = false;
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
        if (this.project.persona.apellido.length == 0) {
          window.location.reload();
        }
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
    this.IsLoadding = true;
    const id = this.activatedRouter.snapshot.params['idproy'];
    this.proyService.UpdateProyecto(id, this.project).subscribe(
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
          'editproy/' +
          this.activatedRouter.snapshot.params['idper'] +
          '/' +
          id;
        this.router.navigate(['']);
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

    this.persService
      .hasPermissions(idPersonaLogged, this.tokenService.getUsername())
      .subscribe((data) => (this.hasPermission = data));
    /*
    console.log(
      'Proyectos: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }
}
