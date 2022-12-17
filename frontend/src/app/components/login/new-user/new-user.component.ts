import { ImageService } from './../../../service/image.service';
import { NewUser } from './../../../model/new-user';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { AuthService } from 'src/app/service/auth.service';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit, AfterViewInit {
  nombre: string = '';
  apellido: string = '';
  descripcion: string = '';
  provincia: string = '';
  pais: string = '';
  codigo_postal: number;
  fecha_nacimiento: Date = new Date();
  telefono: string = '';
  foto_perfil_url: string = '';
  username: string = '';
  correo: string = '';
  password: string = '';
  confirm_correo: string = '';
  confirm_password: string = '';
  //NuevaC: NewAccount = null;
  NuevoUsuario: NewUser = null;
  //Persona: persona = new persona('', '', '', '', '', 0, new Date(), '', '');
  ListPersona: persona[] = [];

  showPassword = false;
  typeInputPass = 'password';

  constructor(
    private authService: AuthService,
    private persService: PersonaService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public imgService: ImageService,
    private changeDet: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {}

  onCreate() {
    if (this.correo != this.confirm_correo) {
      alert('Los correos deben coincidir');
      this.router.navigate(['/createaccount']);
    } else if (this.password != this.confirm_password) {
      alert('Las contraseñas deben coincidir');
      this.router.navigate(['/createaccount']);
    } else {
      /*Se crea primero la cuenta de usuario*/
      this.SaveUser();
    }
  }

  SaveUser() {
    const NUser = new NewUser();
    NUser.username = this.username;
    NUser.correo = this.correo;
    NUser.password = this.password;
    this.authService.newUser(NUser).subscribe(
      (data) => {
        console.log('Usuario Creado: ', data);
        /*Se cargan los datos de la persona*/
        this.authService.getByUsername(NUser.username).subscribe((element) => {
          this.SavePersona(element);
        });
      },
      (err) => {
        alert('Fallo la operacion en Usuario');
        console.log(err);
      }
    );
  }

  SavePersona(user: NewUser) {
    if (user != null) {
      const NPersona = new persona(
        this.nombre,
        this.apellido,
        this.descripcion,
        this.provincia,
        this.pais,
        this.codigo_postal,
        this.fecha_nacimiento,
        this.telefono,
        //this.foto_perfil_url,
        this.imgService.url,
        user
      );
      this.persService.SavePersona(NPersona).subscribe(
        (data) => {
          console.log('Persona Creada: ', data);
          alert('Usuario Creado');
          this.router.navigate(['/login']);
        },
        (err) => {
          alert('Fallo la operacion en Persona');
          console.log(err);
        }
      );
    }
  }

  uploadImage($event: any) {
    //const id = this.getLastId();
    //console.log('LAST ID: ', id);
    //const name = 'perfil_' + this.generaCadenaAleatoria();
    //const name = 'perfil_' + id;
    //this.imgService.uploadImage($event, name);

    this.persService.getListPersonas().subscribe((data) => {
      this.ListPersona = data;
      const MaxID = Math.max(...this.ListPersona.map((x) => x.idpersona)) + 1;
      if (MaxID > 0) {
        console.log('longitud:', this.ListPersona.length);
        const name = 'perfil_' + MaxID;
        this.imgService.uploadImage($event, name);
      } else {
        const name = 'perfil_' + 1;
        this.imgService.uploadImage($event, name);
      }
    });
  }
  showPass() {
    if (!this.showPassword) {
      this.showPassword = true;
      this.typeInputPass = 'text';
    }
  }

  hiddenPass() {
    if (this.showPassword) {
      this.showPassword = false;
      this.typeInputPass = 'password';
    }
  }
}
