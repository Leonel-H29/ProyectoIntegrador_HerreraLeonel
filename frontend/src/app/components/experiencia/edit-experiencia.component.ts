import { TokenService } from './../../service/token.service';
import { TipoEmpleo } from 'src/app/model/tipo-empleo';
import { PersonaService } from 'src/app/service/persona.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencialab } from 'src/app/model/experiencialab';
import { ExperiencialabService } from 'src/app/service/experiencialab.service';
import { TipoEmpleoService } from 'src/app/service/tipo-empleo.service';
import { NewUser } from 'src/app/model/new-user';
import { persona } from './../../model/persona.model';
@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css'],
})
export class EditExperienciaComponent implements OnInit, AfterViewInit {
  expLab: Experiencialab = null;
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
  ListaTiposEmpleos: TipoEmpleo[];
  selected: TipoEmpleo = null;
  IsLoadding = false;
  constructor(
    private expService: ExperiencialabService,
    private TipoEmpServ: TipoEmpleoService,
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
    this.getExperiencia();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  getExperiencia(): void {
    const id = this.activatedRouter.snapshot.params['idexp'];
    this.getTiposEmpleos();
    this.expService.GetExperiencia(id).subscribe(
      (data) => {
        this.expLab = data;
        this.expLab.persona = this.Persona;
        if (this.expLab.persona.apellido.length == 0) {
          window.location.reload();
        }
        console.log('expLab: ', this.expLab);
      },
      (err) => {
        console.log('expLab: ', null);
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    this.IsLoadding = true;
    const id = this.activatedRouter.snapshot.params['idexp'];
    //this.expLab.tipoEmpleo = this.selected;
    this.expService.UpdateExperiencia(id, this.expLab).subscribe(
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
          'editexp/' +
          this.activatedRouter.snapshot.params['idper'] +
          '/' +
          this.activatedRouter.snapshot.params['idexp'];
        this.router.navigate([ruta]);
      }
    );
  }

  getPersona(): void {
    const idPersonaLogged = this.activatedRouter.snapshot.params['idper'];

    this.persService.getPersona(idPersonaLogged).subscribe(
      (data) => {
        //this.expLab.persona = data;
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
      'Experiencia: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
  }

  getTiposEmpleos(): void {
    this.TipoEmpServ.ListaTipoEmpleo().subscribe((data) => {
      this.ListaTiposEmpleos = data;
      console.log('Tipo de empleos: ', this.ListaTiposEmpleos);
    });
  }
}
