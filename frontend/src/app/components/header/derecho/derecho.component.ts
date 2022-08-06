import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-derecho',
  templateUrl: './derecho.component.html',
  styleUrls: ['./derecho.component.css'],
})
export class DerechoComponent implements OnInit {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
}
