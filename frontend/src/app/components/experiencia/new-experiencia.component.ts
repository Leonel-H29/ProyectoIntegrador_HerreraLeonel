import { TokenService } from './../../service/token.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Experiencialab } from 'src/app/model/experiencialab';
import { persona } from 'src/app/model/persona.model';
import { TipoEmpleo } from 'src/app/model/tipo-empleo';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TipoEmpleoService } from 'src/app/service/tipo-empleo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NewUser } from 'src/app/model/new-user';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css'],
})
export class NewExperienciaComponent implements OnInit, AfterViewInit {
  NnombreE: string = '';
  NDescripcion: string = '';
  NfechaInicio: Date = new Date();
  NfechaFin: Date = new Date();
  //idTipo: number = 0;
  //idPersona: number = 0;
  NTipo: TipoEmpleo = new TipoEmpleo('');
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

  ListaTiposEmpleos: TipoEmpleo[];
  //Persona: persona;
  isLogged = false;
  hasPermission = false;

  constructor(
    private Expeserv: ExperiencialabService,
    private TipoEmpServ: TipoEmpleoService,
    private PersServ: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private changeDet: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.getPersona();
    this.getTiposEmpleos();
  }

  OnCreate() {
    //this.getNewTipoEmpleo(this.idTipo);
    if (this.NTipo) {
      const expe = new Experiencialab(
        this.NnombreE,
        this.NfechaInicio,
        this.NfechaFin,
        this.NDescripcion,
        this.NPersona,
        this.NTipo
      );
      this.Expeserv.SaveExperiencia(expe).subscribe(
        (data) => {
          alert('Experiencia añadida');
          this.router.navigate(['']);
        },
        (err) => {
          alert('Fallo la operacion');
          console.log(err);
          //this.router.navigate(['']);
        }
      );
    }
  }
  /*
  getNewTipoEmpleo(id:number): void{
    this.TipoEmpServ.GetTipoEmpleo(id).subscribe(
      (data) =>{
        this.NTipo = data;
      },
      (err)=>{
        alert('Fallo la operacion');
        console.log(err);
      }
    )
  }
  */

  getTiposEmpleos(): void {
    this.TipoEmpServ.ListaTipoEmpleo().subscribe((data) => {
      this.ListaTiposEmpleos = data;
      console.log('Experiencia: ', this.ListaTiposEmpleos);
    });
  }

  getPersona(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    //this.Persona = this.PersServ.getPersona(id);
    this.PersServ.getPersona(id).subscribe(
      (data) => {
        this.NPersona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
    this.hasPermissions();
  }

  hasPermissions(): void {
    this.PersServ.getPersonaByUsername(
      this.tokenService.getUsername()
    ).subscribe(
      (data) => {
        console.log(data.idpersona, this.NPersona.idpersona);
        if (data.idpersona == this.NPersona.idpersona) {
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
