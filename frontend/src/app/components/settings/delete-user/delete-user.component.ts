import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';
import { persona } from 'src/app/model/persona.model';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit, AfterViewInit {
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
  isLogged = false;
  hasPermission = false;
  IsLoadding = false;

  constructor(
    private changeDet: ChangeDetectorRef,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private persService: PersonaService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }
  ngOnInit(): void {
    this.getPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  getPersona(): void {
    this.persService.getPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.Persona = data;
        //console.log(this.Persona);
      },
      (err) => {
        alert('No se pudo encontrar a la persona');
      }
    );
    this.persService
      .hasPermissions(this.idPersonaLogged, this.tokenService.getUsername())
      .subscribe((data) => (this.hasPermission = data));
  }

  deleteUser(id?: number) {
    if (id != undefined) {
      this.IsLoadding = true;
      this.authService.getByPersona(id).subscribe(
        (data) => {
          console.log('ID usuario: ', data.idusuario);
          this.authService.deleteUser(data.idusuario).subscribe(
            (data) => {
              alert('Se elimino su cuenta');
              this.router.navigate(['/login']);
            },
            (err) => {
              this.IsLoadding = false;
              alert('No se ha podido eliminar la operacion');
            }
          );
        },
        (err) => {
          this.IsLoadding = false;
          alert('No se ha podido encontrar el usuario');
        }
      );
    }
  }
}
