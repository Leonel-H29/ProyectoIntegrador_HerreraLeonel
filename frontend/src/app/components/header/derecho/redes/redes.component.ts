import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Redes } from 'src/app/model/red';
import { RedesService } from 'src/app/service/redes.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css'],
})
export class RedesComponent implements OnInit, AfterViewInit {
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
  RedesUser: Redes[] = [];
  isLogged = false;
  constructor(
    private activatedRouter: ActivatedRoute,
    private changeDet: ChangeDetectorRef,
    private redService: RedesService,
    private tokenService: TokenService
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) this.isLogged = true;

    if (this.idPersonaLogged != undefined) {
      this.getRedes();
    }
  }

  getRedes(): void {
    this.redService.ListaRedesByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.RedesUser = data;
      },
      (err) => {
        console.log('Error: ', err);
        //this.router.navigate(['']);
      }
    );
  }
}
