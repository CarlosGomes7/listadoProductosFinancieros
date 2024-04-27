import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageFlowRoutingModule } from './home-page-flow-routing.module';

const IMPORTS = [
  CommonModule,
  HomePageFlowRoutingModule,];

@NgModule({
  declarations: [],
  imports: [...IMPORTS]
})

export class HomeFlowModule { }
