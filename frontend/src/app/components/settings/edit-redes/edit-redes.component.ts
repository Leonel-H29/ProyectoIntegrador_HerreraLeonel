import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';
import { persona } from 'src/app/model/persona.model';
import { Redes } from 'src/app/model/red';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { RedesService } from 'src/app/service/redes.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-edit-redes',
  templateUrl: './edit-redes.component.html',
  styleUrls: ['./edit-redes.component.css'],
})
export class EditRedesComponent implements OnInit, AfterViewInit {
  NombreRed: string = '';
  UrlWeb: string = '';

  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
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
  RedesUser: Redes[] = [];

  DataFacebook: Redes = new Redes('Facebook', '', this.Persona);
  DataInstagram: Redes = new Redes('Instagram', '', this.Persona);
  DataTwitter: Redes = new Redes('Twitter', '', this.Persona);
  DataLinkedin: Redes = new Redes('Linkedin', '', this.Persona);
  DataGithub: Redes = new Redes('GitHub', '', this.Persona);
  isLogged = false;
  hasPermission = false;
  IsLoadding = false;

  constructor(
    private authService: AuthService,
    private persService: PersonaService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService,
    private redService: RedesService,
    private changeDet: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getPersona();
    this.getRedes();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.persService
        .hasPermissions(this.idPersonaLogged, this.tokenService.getUsername())
        .subscribe((data) => (this.hasPermission = data));
    } else {
      this.router.navigate(['/login/']);
    }
  }

  getRedes(): void {
    this.redService.ListaRedesByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.RedesUser = data;
        //this.expLab = data;
        //this.expLab.persona = this.Persona;
        console.log('Redes: ', this.RedesUser);

        this.dataFacebook();
        this.dataInstagram();
        this.dataTwitter();
        this.dataLinkedin();
        this.dataGitHub();

        console.log('Redes: ', this.DataFacebook);
        console.log('Redes: ', this.DataInstagram);
        console.log('Redes: ', this.DataTwitter);
        console.log('Redes: ', this.DataLinkedin);
        console.log('Redes: ', this.DataGithub);
      },
      (err) => {
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        this.router.navigate(['']);
      }
    );
  }
  //=======================================================//
  dataFacebook(): void {
    this.RedesUser.forEach((x) => {
      if (x.red === 'Facebook') this.DataFacebook = x;
    });
  }
  dataTwitter(): void {
    this.RedesUser.forEach((x) => {
      if (x.red === 'Twitter') this.DataTwitter = x;
    });
  }
  dataInstagram(): void {
    this.RedesUser.forEach((x) => {
      if (x.red === 'Instagram') this.DataInstagram = x;
    });
  }
  dataGitHub(): void {
    this.RedesUser.forEach((x) => {
      if (x.red === 'GitHub') this.DataGithub = x;
    });
  }
  dataLinkedin(): void {
    this.RedesUser.forEach((x) => {
      if (x.red === 'Linkedin') this.DataLinkedin = x;
    });
  }
  //=======================================================//

  onUpdate(): void {
    try {
      this.IsLoadding = true;
      this.saveRed(this.DataFacebook);
      this.saveRed(this.DataInstagram);
      this.saveRed(this.DataTwitter);
      this.saveRed(this.DataLinkedin);
      this.saveRed(this.DataGithub);
      //alert('Registros modificados');
      this.router.navigate(['perfil/' + this.idPersonaLogged]);
    } catch (ex) {
      this.IsLoadding = false;
      console.log(ex);
    }
  }

  saveRed(red: Redes) {
    const redUpdate = new Redes(red.red, red.url_red, this.Persona);
    this.redService.UpdateRed(red.idred, redUpdate).subscribe(
      (data) => {
        console.log('Red actualizada');
        alert('Registro modificado');
        //this.router.navigate(['perfil/' + this.idPersonaLogged]);
      },
      (err) => {
        alert('Error al modificar el registro');
        const ruta = 'editredes/' + this.idPersonaLogged;
        this.router.navigate([ruta]);
      }
    );
    //this.IsLoadding = false;
  }

  getPersona(): void {
    this.persService.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        //this.expLab.persona = data;
        this.Persona = data;
        //console.log(this.project);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
        this.router.navigate(['/perfil/' + this.idPersonaLogged]);
        //this.router.navigate(['']);
      }
    );
  }
}
