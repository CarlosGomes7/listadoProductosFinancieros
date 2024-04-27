import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductPageComponent } from './commons/components/list-product-page/list-product-page.component';
import { AddProductPageComponent } from './commons/components/add-product-page/add-product-page.component';
import { UpdateProductPageComponent } from './commons/components/update-product-page/update-product-page.component';

const routes: Routes = [
 { path: '', component: ListProductPageComponent} ,
 { path: 'agregar', component: AddProductPageComponent},
 { path: 'editar', component: UpdateProductPageComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageFlowRoutingModule { }
