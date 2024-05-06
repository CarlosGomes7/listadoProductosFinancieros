import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss'
})
export class PageErrorComponent {


  /**
   *
   */
  constructor( private router: Router) { }

  goHome(){
    this.router.navigate(['/dashboard/editar']);
  }
}
