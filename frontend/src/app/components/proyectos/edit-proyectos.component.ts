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
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css'],
})
export class EditProyectosComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['idper'];
  idProyectoEdit: number = this.activatedRouter.snapshot.params['idproy'];
  project: Proyectos = null;
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
    this.proyService.GetProyecto(this.idProyectoEdit).subscribe(
      (data) => {
        this.project = data;
        this.project.persona = this.Persona;
        if (this.project.persona.apellido.length == 0) {
          window.location.reload();
        }
        //console.log('project: ', this.project);
      },
      (err) => {
        //console.log('project: ', null);
        //alert('Error al modificar el registro');
        Swal.fire(
          'Error al modificar el registro',
          'Vuelva a intentarlo',
          'error'
        );
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    this.IsLoadding = true;
    this.proyService
      .UpdateProyecto(this.idProyectoEdit, this.project)
      .subscribe(
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
          const ruta =
            'editproy/' + this.idPersonaLogged + '/' + this.idProyectoEdit;
          this.router.navigate([ruta]);
        }
      );
  }

  getPersona(): void {
    this.persService.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.project);
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

    this.persService
      .hasPermissions(this.idPersonaLogged, this.tokenService.getUsername())
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
