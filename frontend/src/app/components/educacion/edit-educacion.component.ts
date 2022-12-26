import { TokenService } from './../../service/token.service';
import { persona } from './../../model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from './../../service/persona.service';
import { EducacionService } from './../../service/educacion.service';
import { Educacion } from './../../model/educacion';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NewUser } from 'src/app/model/new-user';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css'],
})
export class EditEducacionComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['idper'];
  idEducacionEdit: number = this.activatedRouter.snapshot.params['idedu'];
  educacion: Educacion = null;
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
    private educServ: EducacionService,
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
    this.getEducacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  getEducacion(): void {
    this.educServ.GetEducacion(this.idEducacionEdit).subscribe(
      (data) => {
        this.educacion = data;
        this.educacion.persona = this.Persona;
        if (this.educacion.persona.apellido.length == 0) {
          window.location.reload();
        }
        //console.log('educacion: ', this.educacion);
      },
      (err) => {
        //console.log('educacion: ', null);
        //alert('Error al modificar el registro');
        Swal.fire(
          'Error al modificar el registro',
          'Volver al inicio',
          'error'
        );
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    this.IsLoadding = true;
    this.educServ
      .UpdateEducacion(this.idEducacionEdit, this.educacion)
      .subscribe(
        (data) => {
          //alert('Registro modificado');
          Swal.fire('Registro modificado', 'Press Ok', 'success');
          this.router.navigate(['perfil/' + this.idPersonaLogged]);
        },
        (err) => {
          this.IsLoadding = false;
          const ruta =
            'editedu/' + this.idPersonaLogged + '/' + this.idEducacionEdit;
          //alert('Error al modificar el registro');
          Swal.fire(
            'Error al modificar el registro',
            'Vuelva a intentarlo',
            'error'
          );
          this.router.navigate([ruta]);
        }
      );
  }

  getPersona(): void {
    this.persService.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.educacion);
      },
      (err) => {
        Swal.fire(
          'No se pudo encontrar a la persona',
          'Volver al perfil',
          'error'
        );
        this.router.navigate(['/perfil/' + this.idPersonaLogged]);
        //alert('No se pudo encontrar a la persona');
        //this.router.navigate(['']);
      }
    );
    this.persService
      .hasPermissions(this.idPersonaLogged, this.tokenService.getUsername())
      .subscribe((data) => (this.hasPermission = data));
    /*
    console.log(
      'Educacion: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }
}
