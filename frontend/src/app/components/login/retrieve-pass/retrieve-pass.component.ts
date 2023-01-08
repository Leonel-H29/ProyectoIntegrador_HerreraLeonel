import { NewUser } from 'src/app/model/new-user';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retrieve-pass',
  templateUrl: './retrieve-pass.component.html',
  styleUrls: ['./retrieve-pass.component.css'],
})
export class RetrievePassComponent implements OnInit, AfterViewInit {
  User: string = '';
  password: string = '';
  confirm_password: string = '';
  dataUser: NewUser = new NewUser();
  idUsuario!: number;
  encontrado = false;

  showPassword = false;
  typeInputPass = 'password';
  IsLoadding = false;

  constructor(
    private changeDet: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {}

  searchUser() {
    //console.log(this.User);

    this.authService.getByUsername(this.User).subscribe(
      (data) => {
        if (data != null) {
          this.encontrado = true;
          this.idUsuario = data.idusuario;
          this.dataUser.username = data.username;
          this.dataUser.correo = data.correo;
          this.dataUser.password = data.password;
          this.dataUser.authorities = data.authorities;
          //console.log(this.dataUser);
          Swal.fire('Usuario Encontrado', this.dataUser.username, 'success');
        }
      },
      (err) => {
        console.log('No se ha encontrado por username');
      }
    );

    if (this.encontrado == false) {
      this.authService.getByCorreo(this.User).subscribe(
        (data) => {
          if (data != null) {
            this.encontrado = true;
            this.idUsuario = data.idusuario;
            this.dataUser.username = data.username;
            this.dataUser.correo = data.correo;
            this.dataUser.password = data.password;
            this.dataUser.authorities = data.authorities;
            //console.log(this.dataUser);
            Swal.fire('Usuario Encontrado', this.dataUser.username, 'success');
          }
        },
        (err) => {
          console.log('No se ha encontrado por correo');
        }
      );
    }

    if (this.encontrado == false) {
      Swal.fire(
        'Error en la busqueda',
        'No se ha encontrado por username o correo',
        'error'
      );
    }
  }

  changePassword() {
    this.IsLoadding = true;
    if (this.password == '' || this.confirm_password == '') {
      //alert('Las contraseñas no pueden ser vacias');
      Swal.fire(
        'Error al modificar el registro',
        'Las contraseñas no pueden ser vacias',
        'error'
      );
      this.IsLoadding = false;
    } else if (this.password != this.confirm_password) {
      //alert('Las contraseñas deben coincidir');
      Swal.fire(
        'Error al modificar el registro',
        'Las contraseñas deben coincidir',
        'error'
      );
      this.IsLoadding = false;
    } else {
      this.dataUser.password = this.password;
      this.authService
        .retrievePassword(this.idUsuario, this.dataUser)
        .subscribe(
          (data) => {
            Swal.fire('Contraseña modificada', 'Press Ok', 'success');
            //alert('Contraseña modificada');
            this.router.navigate(['/login']);
          },
          (err) => {
            this.IsLoadding = false;
            //alert('Error al cambiar la contraseña');
            Swal.fire('Error al cambiar la contraseña', '', 'error');
            this.router.navigate(['/retrievepass']);
          }
        );
    }
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
