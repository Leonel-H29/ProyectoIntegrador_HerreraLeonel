import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-retrieve-pass',
  templateUrl: './retrieve-pass.component.html',
  styleUrls: ['./retrieve-pass.component.css'],
})
export class RetrievePassComponent implements OnInit, AfterViewInit {
  User: string = '';
  password: string = '';
  confirm_password: string = '';

  encontrado = false;

  constructor(
    private changeDet: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {}

  searchUser() {
    //console.log(this.User);
    this.authService.getByUsername(this.User).subscribe(
      (data) => {
        if (data != null) this.encontrado = true;
      },
      (err) => {
        console.log('No se ha encontrado por username');
      }
    );

    if (this.encontrado == false) {
      this.authService.getByCorreo(this.User).subscribe(
        (data) => {
          if (data != null) this.encontrado = true;
        },
        (err) => {
          console.log('No se ha encontrado por username');
        }
      );
    }
  }

  changePassword() {}
}
