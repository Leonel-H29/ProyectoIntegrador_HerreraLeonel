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
@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css'],
})
export class EditEducacionComponent implements OnInit, AfterViewInit {
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
    const id = this.activatedRouter.snapshot.params['idedu'];

    this.educServ.GetEducacion(id).subscribe(
      (data) => {
        this.educacion = data;
        this.educacion.persona = this.Persona;
        if (this.educacion.persona.apellido.length == 0) {
          window.location.reload();
        }

        console.log('educacion: ', this.educacion);
      },
      (err) => {
        console.log('educacion: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    this.IsLoadding = true;
    const id = this.activatedRouter.snapshot.params['idedu'];
    this.educServ.UpdateEducacion(id, this.educacion).subscribe(
      (data) => {
        alert('Registro modificado');
        this.router.navigate([
          'perfil/' + this.activatedRouter.snapshot.params['idper'],
        ]);
      },
      (err) => {
        this.IsLoadding = false;
        const ruta =
          'editedu/' + this.activatedRouter.snapshot.params['idper'] + '/' + id;
        alert('Error al modificar el registro');
        this.router.navigate([ruta]);
      }
    );
  }

  getPersona(): void {
    const idPersonaLogged = this.activatedRouter.snapshot.params['idper'];

    this.persService.getPersona(idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.educacion);
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
      'Educacion: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }
}
