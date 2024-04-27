import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataModule } from '../data/repositories/dataModule';

const IMPORTS = [
  CommonModule, 
  RouterOutlet, 
  DataModule];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
}
