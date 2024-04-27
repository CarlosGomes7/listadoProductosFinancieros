import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

const IMPORTS = [  
  RouterOutlet,  
  LoaderComponent
  ];

@Component({
  standalone: true,
  imports: [...IMPORTS],
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})

export class AppLayoutComponent  {
  
  
  constructor() {}


  
}


