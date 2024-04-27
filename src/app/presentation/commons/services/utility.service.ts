import { Injectable } from '@angular/core';
import { ProductFinancialModel } from '../../../domain/models/product-financial';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilityService {
  itemSelected: any;
  private showLoader = new BehaviorSubject(false);
	showLoader$ = this.showLoader.asObservable();

  constructor() {}

  // Función para obtener el valor actual de itemSelected
  getItemSelected(): any {
    return this.itemSelected;
  }

  // Función para establecer el valor de itemSelected
  setItemSelected(item: ProductFinancialModel): void {
    this.itemSelected = item;
  }

  showLoaderSpin() {
		this.showLoader.next(true)
	}

	closeLoaderSpin() {
		this.showLoader.next(false)
	}
}
