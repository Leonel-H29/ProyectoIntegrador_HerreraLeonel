import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Redes } from 'src/app/model/red';
import { RedesService } from 'src/app/service/redes.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css'],
})
export class RedesComponent implements OnInit, AfterViewInit {
  //showRedes = true;
  idPersonaLogged: number = this.activatedRouter.snapshot.params['id'];
  RedesUser: Redes[] = [];
  constructor(
    private activatedRouter: ActivatedRoute,
    private changeDet: ChangeDetectorRef,
    private redService: RedesService
  ) {}

  ngAfterViewInit(): void {
    this.changeDet.detectChanges();
  }

  ngOnInit(): void {
    this.getRedes();
  }

  getRedes(): void {
    this.redService.ListaRedesByPersona(this.idPersonaLogged).subscribe(
      (data) => {
        this.RedesUser = data;
      },
      (err) => {
        alert('Error al modificar el registro');
        console.log('Error: ', err);
        //this.router.navigate(['']);
      }
    );
  }
}
