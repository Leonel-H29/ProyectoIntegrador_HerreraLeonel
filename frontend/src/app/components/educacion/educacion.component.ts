import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { EducacionService } from 'src/app/service/educacion.service';
import { Educacion } from 'src/app/model/educacion';
import { persona } from 'src/app/model/persona.model';
import { NewUser } from 'src/app/model/new-user';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  @Input() idPersonaLogged: number = 0;
  @Output() GetidPersona = new EventEmitter<number>();
  educ: Educacion[] = [];
  educacionAeliminar: Educacion;
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
    private eduService: EducacionService,
    private tokenService: TokenService,
    private activatedRouter: ActivatedRoute,
    private PersServ: PersonaService,
    private router: Router
  ) {}

  isLogged = false;
  hasPermission = false;

  ngOnInit(): void {
    this.getPersona();
    //console.log('Id Persona: ', this.idPersonaLogged);
    //console.log('Persona: ', this.Persona);
    this.CargarEducaciones();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  CargarEducaciones(): void {
    this.eduService.ListaEduByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.educ = data;
        console.log('Educacion: ', this.educ);
      },
      (err) => {
        alert('Se encontro un error en la lista');
        //console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  DeleteEducacion(id?: number) {
    if (id != undefined) {
      this.eduService.DeleteEducacion(id).subscribe(
        (data) => {
          alert('Se elimino la educacion');
          this.CargarEducaciones();
          this.router.navigate(['']);
        },
        (err) => {
          alert('No se ha podido eliminar la educacion');
        }
      );
    }
  }

  getEducacionAEliminar(educacion: Educacion): void {
    this.educacionAeliminar = educacion;
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
        alert('No se pudo encontrar a la persona');
        this.router.navigate(['']);
      }
    );
    this.hasPermissions();
  }

  hasPermissions(): void {
    this.PersServ.getPersonaByUsername(
      this.tokenService.getUsername()
    ).subscribe(
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
  }
}
