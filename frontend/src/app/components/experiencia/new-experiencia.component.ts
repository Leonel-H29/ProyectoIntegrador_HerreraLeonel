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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css'],
})
export class NewExperienciaComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
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
    '',
    0,
    new Date(),
    '',
    '',
    new NewUser()
  );

  ListaTiposEmpleos: TipoEmpleo[];
  isLogged = false;
  hasPermission = false;
  IsLoadding = false;

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
    this.getPersona();
    this.getTiposEmpleos();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  OnCreate() {
    if (this.NTipo) {
      this.IsLoadding = true;

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
          //alert('Experiencia añadida');
          Swal.fire('Experiencia añadida', 'Press Ok', 'success');
          this.router.navigate(['perfil/' + this.idPersonaLogged]);
        },
        (err) => {
          this.IsLoadding = false;

          //alert('Fallo la operacion');
          Swal.fire('Fallo la operacion', 'Vuelva a intentarlo', 'error');
          console.log(err);
          this.router.navigate(['createexp/' + this.idPersonaLogged]);
        }
      );
    }
  }

  getTiposEmpleos(): void {
    this.TipoEmpServ.ListaTipoEmpleo().subscribe((data) => {
      this.ListaTiposEmpleos = data;
      //console.log('Experiencia: ', this.ListaTiposEmpleos);
    });
  }

  getPersona(): void {
    this.PersServ.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.NPersona = data;
        //console.log(this.Persona);
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
    this.PersServ.hasPermissions(
      this.idPersonaLogged,
      this.tokenService.getUsername()
    ).subscribe((data) => (this.hasPermission = data));
    /*
    console.log(
      'Experiencia: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }
}
